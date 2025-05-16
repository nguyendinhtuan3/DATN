const express = require("express");
const db = require("../../db");
const { verifyRole } = require("../middlewares/auth");

const router = express.Router();

// 📌 Lấy danh sách bài học (có tìm kiếm & phân trang)
router.get("/all", async (req, res) => {
  const { search = "", page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const conn = db.promise();

    const [lessons] = await conn.query(
      `SELECT id, title, content, course_id, link, createdAt, updatedAt 
       FROM lessons 
       WHERE title LIKE ?
       ORDER BY createdAt DESC
       LIMIT ? OFFSET ?`,
      [`%${search}%`, parseInt(limit), parseInt(offset)]
    );

    const [[{ total }]] = await conn.query(
      `SELECT COUNT(*) AS total FROM lessons WHERE title LIKE ?`,
      [`%${search}%`]
    );

    return res.json({ status: true, lessons, total });
  } catch (err) {
    console.error("Get lessons error:", err);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

// 📌 Lấy chi tiết bài học
router.get("/:id/detail", async (req, res) => {
  const { id } = req.params;

  try {
    const conn = db.promise();
    const [rows] = await conn.query(
      `SELECT id, title, content, course_id, link, createdAt, updatedAt 
       FROM lessons WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ status: false, message: "Không tìm thấy bài học" });
    }

    return res.json({ status: true, lesson: rows[0] });
  } catch (err) {
    console.error("Get lesson detail error:", err);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

// 📌 Thêm bài học
router.post("/add", verifyRole("admin"), async (req, res) => {
  const { title, content, course_id, link } = req.body;

  if (!title || !course_id) {
    return res.status(400).json({ status: false, message: "Thiếu tiêu đề hoặc khóa học" });
  }

  try {
    const conn = db.promise();

    await conn.query(
      `INSERT INTO lessons (id, title, content, course_id, link, createdAt, updatedAt)
       VALUES (UUID(), ?, ?, ?, ?, NOW(), NOW())`,
      [title, content, course_id, link]
    );

    return res.status(201).json({
      status: true,
      message: "Thêm bài học thành công",
    });
  } catch (err) {
    console.error("Add lesson error:", err);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

// 📌 Cập nhật bài học
router.put("/:id/update", verifyRole("admin"), async (req, res) => {
  const { id } = req.params;
  const { title, content, course_id, link } = req.body;

  try {
    const conn = db.promise();

    await conn.query(
      `UPDATE lessons 
       SET title = ?, content = ?, course_id = ?, link = ?, updatedAt = NOW()
       WHERE id = ?`,
      [title, content, course_id, link, id]
    );

    return res.json({ status: true, message: "Cập nhật bài học thành công" });
  } catch (err) {
    console.error("Update lesson error:", err);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

// 📌 Xóa bài học
router.delete("/:id/delete", verifyRole("admin"), async (req, res) => {
  const { id } = req.params;

  try {
    const conn = db.promise();
    await conn.query(`DELETE FROM lessons WHERE id = ?`, [id]);

    return res.json({ status: true, message: "Xóa bài học thành công" });
  } catch (err) {
    console.error("Delete lesson error:", err);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

// 📌 Lấy danh sách bài học theo course_id (có phân trang & tìm kiếm)
router.get("/by-course/:courseId", async (req, res) => {
  const { courseId } = req.params;
  const { search = "", page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const conn = db.promise();

    const [lessons] = await conn.query(
      `SELECT id, title, content, course_id, link
       FROM lessons
       WHERE course_id = ? AND title LIKE ?
       ORDER BY title ASC
       LIMIT ? OFFSET ?`,
      [courseId, `%${search}%`, parseInt(limit), parseInt(offset)]
    );

    const [[{ total }]] = await conn.query(
      `SELECT COUNT(*) AS total FROM lessons 
       WHERE course_id = ? AND title LIKE ?`,
      [courseId, `%${search}%`]
    );

    return res.json({ status: true, lessons, total });
  } catch (err) {
    console.error("Get lessons by course error:", err);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

module.exports = router;
