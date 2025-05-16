const express = require("express");
const db = require("../../db");
const { verifyRole } = require("../middlewares/auth");

const router = express.Router();

// 📌 Lấy danh sách role
router.get("/all", verifyRole("admin"), async (req, res) => {
  try {
    const conn = db.promise();
    const [roles] = await conn.query("SELECT id, name FROM roles ORDER BY id DESC");
    return res.json({ status: true, roles });
  } catch (err) {
    console.error("Get roles error:", err);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

// 📌 Lấy chi tiết role theo ID
router.get("/:id/detail", verifyRole("admin"), async (req, res) => {
  const { id } = req.params;
  try {
    const conn = db.promise();
    const [roles] = await conn.query("SELECT id, name FROM roles WHERE id = ?", [id]);

    if (roles.length === 0) {
      return res.status(404).json({ status: false, message: "Không tìm thấy role" });
    }

    return res.json({ status: true, role: roles[0] });
  } catch (err) {
    console.error("Get role by ID error:", err);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

// 📌 Thêm role mới
router.post("/add", verifyRole("admin"), async (req, res) => {
  const { name } = req.body;
  try {
    const conn = db.promise();

    // Kiểm tra trùng tên
    const [existing] = await conn.query("SELECT id FROM roles WHERE name = ?", [name]);
    if (existing.length > 0) {
      return res.status(400).json({ status: false, message: "Tên role đã tồn tại" });
    }

    const [result] = await conn.query("INSERT INTO roles (name) VALUES (?)", [name]);
    return res.status(201).json({
      status: true,
      message: "Thêm role thành công",
      role: { id: result.insertId, name },
    });
  } catch (err) {
    console.error("Add role error:", err);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

// 📌 Xoá role
router.delete("/:id/delete", verifyRole("admin"), async (req, res) => {
  const { id } = req.params;
  try {
    const conn = db.promise();
    await conn.query("DELETE FROM roles WHERE id = ?", [id]);
    return res.json({ status: true, message: "Xóa role thành công" });
  } catch (err) {
    console.error("Delete role error:", err);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

module.exports = router;
