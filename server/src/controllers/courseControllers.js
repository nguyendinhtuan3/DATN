const express = require('express');
const db = require('../../db');
const { verifyRole } = require('../middlewares/auth');

const router = express.Router();
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

// 📌 Tạo course mới (chỉ teacher hoặc admin)
router.post('/', verifyRole('teacher'), async (req, res) => {
    try {
        const { name, courseTypeId, description, image, price, link, status } = req.body;
        const creatorId = req.user.id;

        const conn = db.promise();
        const [result] = await conn.query(
            `INSERT INTO courses (name, courseTypeId, description, image, price, link, status, creatorId)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, courseTypeId, description, image, price, link, status, creatorId],
        );

        const [newCourseRows] = await conn.query(`SELECT * FROM courses WHERE id = ?`, [result.insertId]);

        res.json({ status: true, data: newCourseRows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Tạo course thất bại', details: error.message });
    }
});

// 📌 Cập nhật course (chỉ teacher hoặc admin và đúng chủ sở hữu)
router.put('/:id', verifyRole('teacher'), async (req, res) => {
    try {
        const { name, courseTypeId, description, image, price, link, status } = req.body;
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
            `UPDATE courses SET name = COALESCE(?, name),
                                courseTypeId = COALESCE(?, courseTypeId),
                                description = COALESCE(?, description),
                                image = COALESCE(?, image),
                                price = COALESCE(?, price),
                                link = COALESCE(?, link),
                                status = COALESCE(?, status)
             WHERE id = ?`,
            [name, courseTypeId, description, image, price, link, status, courseId],
        );

        const [updatedCourse] = await conn.query(`SELECT * FROM courses WHERE id = ?`, [courseId]);

        res.json({ status: true, data: updatedCourse[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Cập nhật thất bại', details: error.message });
    }
});

// 📌 Xóa course (chỉ teacher hoặc admin và đúng chủ sở hữu)
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

        await conn.query(`DELETE FROM courses WHERE id = ?`, [req.params.id]);
        res.json({ status: true, message: 'Xóa course thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Xóa thất bại', details: error.message });
    }
});

// 📌 Lấy danh sách tất cả khóa học (chỉ lấy dữ liệu từ bảng courses)
router.get('/', async (req, res) => {
    try {
        const conn = db.promise();
        const [rows] = await conn.query(`SELECT * FROM courses ORDER BY createdAt DESC`);

        res.json({ status: true, data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Lấy danh sách thất bại', details: error.message });
    }
});
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
