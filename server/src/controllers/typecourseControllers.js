const express = require("express");
const db = require("../../db");
const { verifyRole } = require("../middlewares/auth");

const router = express.Router();

// 📌 Lấy danh sách loại khóa học (tìm kiếm & phân trang)
router.get("/all", verifyRole("admin"), async (req, res) => {
  const { search = "", page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const conn = db.promise();

    const [courseTypes] = await conn.query(
      `SELECT id, name, createdAt, updatedAt FROM course_types 
       WHERE name LIKE ?
       ORDER BY createdAt DESC
       LIMIT ? OFFSET ?`,
      [`%${search}%`, parseInt(limit), parseInt(offset)]
    );

    const [[{ total }]] = await conn.query(
      `SELECT COUNT(*) AS total FROM course_types WHERE name LIKE ?`,
      [`%${search}%`]
    );

    return res.json({ status: true, courseTypes, total });
  } catch (err) {
    console.error("Get course types error:", err);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

// 📌 Lấy chi tiết loại khóa học theo ID
router.get("/:id/detail", verifyRole("admin"), async (req, res) => {
  const { id } = req.params;

  try {
    const conn = db.promise();
    const [rows] = await conn.query(
      "SELECT id, name, createdAt, updatedAt FROM course_types WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ status: false, message: "Không tìm thấy loại khóa học" });
    }

    return res.json({ status: true, courseType: rows[0] });
  } catch (err) {
    console.error("Get course type detail error:", err);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

// 📌 Thêm loại khóa học
router.post("/add", verifyRole("admin"), async (req, res) => {
  const { name } = req.body;

  try {
    const conn = db.promise();

    // Kiểm tra trùng tên
    const [existing] = await conn.query(
      "SELECT id FROM course_types WHERE name = ?",
      [name]
    );
    if (existing.length > 0) {
      return res.json({ status: false, message: "Tên loại khóa học đã tồn tại" });
    }

    const [result] = await conn.query(
      "INSERT INTO course_types (id, name, createdAt, updatedAt) VALUES (UUID(), ?, NOW(), NOW())",
      [name]
    );

    return res.status(201).json({
      status: true,
      message: "Thêm loại khóa học thành công",
      courseType: { id: result.insertId, name },
    });
  } catch (err) {
    console.error("Add course type error:", err);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

// 📌 Cập nhật loại khóa học
router.put("/:id/update", verifyRole("admin"), async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const conn = db.promise();

    // Kiểm tra trùng tên
    const [existing] = await conn.query(
      "SELECT id FROM course_types WHERE name = ? AND id != ?",
      [name, id]
    );
    if (existing.length > 0) {
      return res.json({ status: false, message: "Tên loại khóa học đã tồn tại" });
    }

    await conn.query(
      "UPDATE course_types SET name = ?, updatedAt = NOW() WHERE id = ?",
      [name, id]
    );

    return res.json({ status: true, message: "Cập nhật thành công" });
  } catch (err) {
    console.error("Update course type error:", err);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

// 📌 Xoá loại khóa học
router.delete("/:id/delete", verifyRole("admin"), async (req, res) => {
  const { id } = req.params;

  try {
    const conn = db.promise();
    await conn.query("DELETE FROM course_types WHERE id = ?", [id]);

    return res.json({ status: true, message: "Xóa loại khóa học thành công" });
  } catch (err) {
    console.error("Delete course type error:", err);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

module.exports = router;
