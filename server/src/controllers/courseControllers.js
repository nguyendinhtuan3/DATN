const express = require('express');
const db = require('../../db');
const { verifyRole } = require('../middlewares/auth');
const nodemailer = require('nodemailer');

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

// 📌 Create new course (teacher only)
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

// 📌 Update course (must be teacher and owner)
router.put('/:id', verifyRole('teacher'), async (req, res) => {
    try {
        const { title, courseTypeId, description, image, price, link } = req.body;
        const courseId = req.params.id;

        const conn = db.promise();

        // Check ownership
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

// 📌 Delete course (must be teacher and owner)
router.delete('/:id', verifyRole('teacher'), async (req, res) => {
    try {
        const conn = db.promise();

        // Check ownership
        const [courseRows] = await conn.query(`SELECT * FROM courses WHERE id = ? AND creatorId = ?`, [
            req.params.id,
            req.user.id,
        ]);

        if (courseRows.length === 0) {
            return res.status(403).json({ status: false, message: 'Không có quyền xóa khóa học này' });
        }

        // Check related lessons
        const [lessonRows] = await conn.query(`SELECT COUNT(*) as total FROM lessons WHERE course_id = ?`, [
            req.params.id,
        ]);

        if (lessonRows[0].total > 0) {
            return res.status(200).json({
                status: false,
                message: `Không thể xóa khóa học vì có ${lessonRows[0].total} bài học liên quan. Hãy xóa các bài học trước.`,
            });
        }

        await conn.query(`DELETE FROM courses WHERE id = ?`, [req.params.id]);
        res.json({ status: true, message: 'Xóa course thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Xóa thất bại', details: error.message });
    }
});

// 📌 Get all courses (optionally filter by courseTypeId)
router.get('/', async (req, res) => {
    try {
        const conn = db.promise();
        const { courseTypeId } = req.query;

        let query = `
            SELECT c.*, 
                   ct.name AS courseTypeName,
                   u.username AS creatorName
            FROM courses c
            LEFT JOIN course_types ct ON c.courseTypeId = ct.id
            LEFT JOIN users u ON c.creatorId = u.id
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

// 📌 Get course by ID
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

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 📌 Confirm course payment and send course link via email
router.post('/confirm-payment', verifyRole('student'), async (req, res) => {
    const conn = db.promise();
    const { courseId } = req.body;
    const userId = req.user.id;
    if (!courseId) {
        return res.status(300).json({
            status: false,
            message: 'Yêu cầu cung cấp ID khóa học',
        });
    }
    try {
        await conn.beginTransaction();

        // 📌 Truy vấn thông tin khóa học
        const [[course]] = await conn.query(
            `SELECT c.*, ct.name AS courseTypeName
             FROM courses c
             LEFT JOIN course_types ct ON c.courseTypeId = ct.id
             WHERE c.id = ?`,
            [courseId],
        );

        if (!course) {
            await conn.rollback();
            return res.status(300).json({
                status: false,
                message: 'Không tìm thấy khóa học',
            });
        }

        // 📌 Truy vấn email của người dùng bằng userId
        const [[user]] = await conn.query(`SELECT email FROM users WHERE id = ?`, [userId]);

        if (!user || !user.email) {
            await conn.rollback();
            return res.status(300).json({
                status: false,
                message: 'Không tìm thấy email người dùng',
            });
        }

        const userEmail = user.email;

        // 📌 Gửi email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: `Xác nhận đăng ký khóa học: ${course.title}`,
            html: `
                <h2>Xác nhận đăng ký khóa học</h2>
                <p>Chào bạn,</p>
                <p>Cảm ơn bạn đã đăng ký khóa học <strong>${course.title}</strong>!</p>
                <p>Bạn có thể truy cập khóa học qua liên kết sau:</p>
                <p><a href="${course.link}">${course.title}</a></p>
                <p>Loại khóa học: ${course.courseTypeName || 'N/A'}</p>
                <p>Giá: ${course.price} VND</p>
                <p>Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi.</p>
                <p>Trân trọng,<br>Đội ngũ nền tảng khóa học</p>
            `,
        });

        await conn.commit();
        res.json({
            status: true,
            message: 'Xác nhận thanh toán thành công, liên kết khóa học đã được gửi qua email',
        });
    } catch (error) {
        await conn.rollback();
        console.error('Lỗi xác nhận thanh toán:', error);
        res.status(500).json({
            status: false,
            message: 'Xác nhận thanh toán thất bại',
            details: error.message,
        });
    }
});

module.exports = router;
