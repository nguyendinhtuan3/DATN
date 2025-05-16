const express = require('express');
const db = require('../../db');
const { verifyRole } = require('../middlewares/auth');

const router = express.Router();

// 📌 Get teacher's courses
router.get('/my-courses', verifyRole('teacher'), async (req, res) => {
    try {
        const conn = db.promise();
        const [rows] = await conn.query(
            `SELECT c.*, ct.name AS courseTypeName
             FROM courses c
             LEFT JOIN course_types ct ON c.courseTypeId = ct.id
             WHERE c.creatorId = ?
             ORDER BY c.createdAt DESC`,
            [req.user.id],
        );

        res.json({ status: true, data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Lấy khóa học thất bại', details: error.message });
    }
});

// 📌 Create new course (teacher or admin only)
router.post('/', verifyRole('teacher'), async (req, res) => {
    try {
        const { title, courseTypeId, description, image, price, link } = req.body;
        const creatorId = req.user.id;

        const conn = db.promise();
        const [result] = await conn.query(
            `INSERT INTO courses (title, courseTypeId, description, image, price, link, creatorId)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, courseTypeId, description, image, price, link, creatorId],
        );

        const [newCourseRows] = await conn.query(`SELECT * FROM courses WHERE id = ?`, [result.insertId]);

        res.json({ status: true, data: newCourseRows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Tạo course thất bại', details: error.message });
    }
});

// 📌 Update course (teacher or admin, must be owner)
router.put('/:id', verifyRole('teacher'), async (req, res) => {
    try {
        const { title, courseTypeId, description, image, price, link } = req.body;
        const courseId = req.params.id;

        const conn = db.promise();
        // Kiểm tra quyền sở hữu
        const [courseRows] = await conn.query(`SELECT * FROM courses WHERE id = ? AND creatorId = ?`, [
            courseId,
            req.user.id,
        ]);
        if (courseRows.length === 0) {
            return res.status(403).json({ status: false, message: 'Không có quyền cập nhật khóa học này' });
        }

        await conn.query(
            `UPDATE courses SET title = COALESCE(?, title),
                                courseTypeId = COALESCE(?, courseTypeId),
                                description = COALESCE(?, description),
                                image = COALESCE(?, image),
                                price = COALESCE(?, price),
                                link = COALESCE(?, link)
             WHERE id = ?`,
            [title, courseTypeId, description, image, price, link, courseId],
        );

        const [updatedCourse] = await conn.query(`SELECT * FROM courses WHERE id = ?`, [courseId]);

        res.json({ status: true, data: updatedCourse[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Cập nhật thất bại', details: error.message });
    }
});

// 📌 Delete course (teacher or admin, must be owner)
router.delete('/:id', verifyRole('teacher'), async (req, res) => {
    try {
        const conn = db.promise();

        // Kiểm tra quyền sở hữu
        const [courseRows] = await conn.query(`SELECT * FROM courses WHERE id = ? AND creatorId = ?`, [
            req.params.id,
            req.user.id,
        ]);
        if (courseRows.length === 0) {
            return res.status(403).json({ status: false, message: 'Không có quyền xóa khóa học này' });
        }

        // Kiểm tra xem khóa học có bài học nào không
        const [lessonRows] = await conn.query(`SELECT COUNT(*) as total FROM lessons WHERE course_id = ?`, [
            req.params.id,
        ]);
        if (lessonRows[0].total > 0) {
            return res.status(200).json({
                status: false,
                message: `Không thể xóa khóa học vì có ${lessonRows[0].total} bài học liên quan. Hãy xóa các bài học trước.`,
            });
        }
        // Nếu không có lesson liên quan, tiến hành xóa
        await conn.query(`DELETE FROM courses WHERE id = ?`, [req.params.id]);
        res.json({ status: true, message: 'Xóa course thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Xóa thất bại', details: error.message });
    }
});

// 📌 Get all courses (with optional filter by courseTypeId)
router.get('/', async (req, res) => {
    try {
        const conn = db.promise();
        const { courseTypeId } = req.query;

        let query = `
            SELECT c.*, ct.name AS courseTypeName
            FROM courses c
            LEFT JOIN course_types ct ON c.courseTypeId = ct.id
        `;
        const queryParams = [];

        if (courseTypeId) {
            query += ' WHERE c.courseTypeId = ?';
            queryParams.push(courseTypeId);
        }

        query += ' ORDER BY c.createdAt DESC';

        const [rows] = await conn.query(query, queryParams);
        res.json({ status: true, data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Lấy danh sách thất bại', details: error.message });
    }
});

// 📌 Get single course by ID
router.get('/:id', async (req, res) => {
    try {
        const conn = db.promise();
        const [rows] = await conn.query(`SELECT * FROM courses WHERE id = ?`, [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ status: false, message: 'Course không tồn tại' });
        }

        res.json({ status: true, data: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Lấy course thất bại', details: error.message });
    }
});

module.exports = router;
