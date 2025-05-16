const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../../db");
const { verifyRole } = require("../middlewares/auth");

const router = express.Router();
const SALT_ROUNDS = 10;

// 📌 Lấy danh sách người dùng (tìm kiếm & phân trang)
router.get("/all", verifyRole("admin"), async (req, res) => {
  const { search = "", page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const conn = db.promise();

    const [users] = await conn.query(
      `SELECT id, username, email, role FROM users 
       WHERE username LIKE ? OR email LIKE ?
       ORDER BY id DESC
       LIMIT ? OFFSET ?`,
      [`%${search}%`, `%${search}%`, parseInt(limit), parseInt(offset)]
    );

    const [[{ total }]] = await conn.query(
      `SELECT COUNT(*) AS total FROM users 
       WHERE username LIKE ? OR email LIKE ?`,
      [`%${search}%`, `%${search}%`]
    );

    return res.json({ status: true, users, total });
  } catch (err) {
    console.error("Get users error:", err);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

// 📌 Lấy chi tiết người dùng theo ID
router.get("/:id/detail", verifyRole("admin"), async (req, res) => {
  const { id } = req.params;
  try {
    const conn = db.promise();
    const [users] = await conn.query(
      "SELECT id, username, email, role FROM users WHERE id = ?",
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({ status: false, message: "Không tìm thấy người dùng" });
    }

    return res.json({ status: true, user: users[0] });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
});

// 📌 Thêm người dùng
router.post("/add", verifyRole("admin"), async (req, res) => {
  const { username, email, password, role = "User" } = req.body;

  try {
    const conn = db.promise();

    // Kiểm tra email hoặc tên đã tồn tại
    const [existing] = await conn.query(
      "SELECT id FROM users WHERE email = ? OR username = ?",
      [email, username]
    );
    if (existing.length > 0) {
      return res.json({ status: false, message: "Email hoặc tên đã tồn tại" });
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const [result] = await conn.query(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, hashed, role]
    );

    return res.status(201).json({
      status: true,
      message: "Thêm người dùng thành công",
      user: { id: result.insertId, username, email, role },
    });
  } catch (err) {
    console.error("Create user error:", err);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

// 📌 Cập nhật người dùng
router.put("/:id/update", verifyRole("admin"), async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  try {
    const conn = db.promise();

    const updateFields = [];
    const updateValues = [];

    if (username) {
      updateFields.push("username = ?");
      updateValues.push(username);
    }
    if (email) {
      updateFields.push("email = ?");
      updateValues.push(email);
    }
    if (role) {
      updateFields.push("role = ?");
      updateValues.push(role);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ status: false, message: "Không có trường nào để cập nhật" });
    }

    updateValues.push(id);
    await conn.query(
      `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`,
      updateValues
    );

    return res.json({ status: true, message: "Cập nhật người dùng thành công" });
  } catch (err) {
    console.error("Update user error:", err);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

// 📌 Xoá người dùng
router.delete("/:id/delete", verifyRole("admin"), async (req, res) => {
  const { id } = req.params;

  try {
    const conn = db.promise();
    await conn.query("DELETE FROM users WHERE id = ?", [id]);
    return res.json({ status: true, message: "Xóa người dùng thành công" });
  } catch (err) {
    console.error("Delete user error:", err);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

module.exports = router;
