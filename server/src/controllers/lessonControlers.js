const express = require("express");
const db = require("../../db");
const { verifyRole } = require("../middlewares/auth");
const router = express.Router();

// 📌 Get all lessons for courses created by the teacher
router.post('/my-created-lessons', verifyRole('teacher'), async (req, res) => {
    try {
        const conn = db.promise();
        const [rows] = await conn.query(
            `SELECT l.id, l.title, l.content, l.course_id, l.createdAt, l.updatedAt,
                    c.title AS courseTitle
             FROM lessons l
             INNER JOIN courses c ON l.course_id = c.id
             WHERE c.creatorId = ?
             ORDER BY l.createdAt DESC`,
            [req.user.id]
        );

        res.json({
            status: true,
            data: rows,
            message: rows.length ? 'Lessons fetched successfully' : 'No lessons found for your courses',
        });
    } catch (error) {
        console.error('Error fetching lessons:', error);
        res.status(500).json({
            status: false,
            message: 'Lấy danh sách bài học thất bại',
            details: error.message,
        });
    }
});

// 📌 Lấy danh sách bài học (có tìm kiếm & phân trang)
router.get("/all", async (req, res) => {
    try {
        const conn = db.promise();

        const [lessons] = await conn.query(
            `SELECT id, title, content, course_id, createdAt, updatedAt
             FROM lessons
             ORDER BY createdAt DESC`
        );

        const [[{ total }]] = await conn.query(
            `SELECT COUNT(*) AS total FROM lessons`
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
            `SELECT id, title, content, course_id, createdAt, updatedAt 
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
router.post("/add", verifyRole("teacher"), async (req, res) => {
    const { title, content, course_id } = req.body;

    if (!title || !course_id) {
        return res.status(400).json({ status: false, message: "Thiếu tiêu đề hoặc khóa học" });
    }

    try {
        const conn = db.promise();
        const lessonId = require('uuid').v4();

        await conn.query(
            `INSERT INTO lessons (id, title, content, course_id, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, NOW(), NOW())`,
            [lessonId, title, content, course_id]
        );

        const [rows] = await conn.query(
            `SELECT id, title, content, course_id, createdAt, updatedAt 
             FROM lessons WHERE id = ?`,
            [lessonId]
        );

        if (!rows || rows.length === 0) {
            return res.status(500).json({ status: false, message: "Không tìm thấy bài học vừa tạo" });
        }

        const newLesson = rows[0];

        return res.status(201).json({
            status: true,
            message: "Thêm bài học thành công",
            data: newLesson
        });
    } catch (err) {
        console.error("Add lesson error:", err);
        return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
    }
});

// 📌 Cập nhật bài học
router.put("/:id/update", verifyRole("teacher"), async (req, res) => {
    const { id } = req.params;
    const { title, content, course_id } = req.body;

    if (!title || !course_id) {
        return res.status(400).json({ status: false, message: "Thiếu tiêu đề hoặc khóa học" });
    }

    try {
        const conn = db.promise();

        const [result] = await conn.query(
            `UPDATE lessons 
             SET title = ?, content = ?, course_id = ?, updatedAt = NOW()
             WHERE id = ?`,
            [title, content, course_id, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "Không tìm thấy bài học" });
        }

        const [rows] = await conn.query(
            `SELECT id, title, content, course_id, createdAt, updatedAt 
             FROM lessons WHERE id = ?`,
            [id]
        );

        if (!rows || rows.length === 0) {
            return res.status(404).json({ status: false, message: "Không tìm thấy bài học sau khi cập nhật" });
        }

        const updatedLesson = rows[0];

        return res.json({
            status: true,
            message: "Cập nhật bài học thành công",
            data: updatedLesson
        });
    } catch (err) {
        console.error("Update lesson error:", err);
        return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
    }
});
// 📌 Xóa bài học
router.delete("/:id/delete", verifyRole("teacher"), async (req, res) => {
    const { id } = req.params;

    try {
        const conn = db.promise();
        const [result] = await conn.query(`DELETE FROM lessons WHERE id = ?`, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "Không tìm thấy bài học" });
        }

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
            `SELECT id, title, content, course_id
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