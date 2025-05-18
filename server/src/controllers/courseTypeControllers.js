const express = require('express');
const db = require('../../db'); // kết nối cơ sở dữ liệu MySQL
const { verifyRole } = require('../middlewares/auth'); // middleware phân quyền

const router = express.Router();

// 📌 Lấy tất cả loại khóa học
router.get('/', async (req, res) => {
    try {
        const conn = db.promise();
        const [rows] = await conn.query(`SELECT * FROM course_types`);
        res.status(200).json({ status: true, data: rows });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

// 📌 Lấy loại khóa học theo ID
router.get('/:id', async (req, res) => {
    try {
        const conn = db.promise();
        const [rows] = await conn.query(`SELECT * FROM course_types WHERE id = ?`, [req.params.id]);

        if (rows.length === 0) {
            return res.status(404).json({ status: false, message: 'Không tìm thấy loại khóa học' });
        }

        res.status(200).json({ status: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

// 📌 Tạo loại khóa học mới (chỉ admin)
const { v4: uuidv4 } = require('uuid');

router.post('/add', verifyRole('admin'), async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ status: false, message: 'Tên là bắt buộc' });

        const id = uuidv4(); // ✅ Tạo UUID mới

        const conn = db.promise();
        await conn.query(`INSERT INTO course_types (id, name) VALUES (?, ?)`, [id, name]);

        const [newRows] = await conn.query(`SELECT * FROM course_types WHERE id = ?`, [id]);

        res.status(201).json({ status: true, data: newRows[0] });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Tạo loại khóa học thất bại', details: error.message });
    }
});

// 📌 Cập nhật loại khóa học (chỉ admin)
router.put('/:id', verifyRole('admin'), async (req, res) => {
    try {
        const { name } = req.body;

        const conn = db.promise();
        const [rows] = await conn.query(`SELECT * FROM course_types WHERE id = ?`, [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ status: false, message: 'Không tìm thấy loại khóa học' });
        }

        await conn.query(`UPDATE course_types SET name = ? WHERE id = ?`, [name || rows[0].name, req.params.id]);

        const [updated] = await conn.query(`SELECT * FROM course_types WHERE id = ?`, [req.params.id]);
        res.status(200).json({ status: true, data: updated[0] });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Cập nhật thất bại', details: error.message });
    }
});

// 📌 Xóa loại khóa học (chỉ admin)
router.delete('/:id', verifyRole('admin'), async (req, res) => {
    try {
        const conn = db.promise();
        const courseTypeId = req.params.id;

        // Kiểm tra loại khóa học có tồn tại không
        const [courseTypeRows] = await conn.query(`SELECT * FROM course_types WHERE id = ?`, [courseTypeId]);

        if (courseTypeRows.length === 0) {
            return res.status(300).json({ status: false, message: 'Không tìm thấy loại khóa học' });
        }

        // Kiểm tra xem có khóa học nào đang sử dụng loại này không
        const [courseUsingType] = await conn.query(`SELECT COUNT(*) AS count FROM courses WHERE courseTypeId = ?`, [
            courseTypeId,
        ]);

        if (courseUsingType[0].count > 0) {
            return res.status(300).json({
                status: false,
                message: 'Không thể xóa vì vẫn còn khóa học thuộc loại này',
            });
        }

        // Nếu không có khóa học nào sử dụng, tiến hành xóa
        await conn.query(`DELETE FROM course_types WHERE id = ?`, [courseTypeId]);

        res.status(200).json({ status: true, message: 'Xóa thành công' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Xóa thất bại', details: error.message });
    }
});

module.exports = router;
