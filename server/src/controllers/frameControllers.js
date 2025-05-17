const express = require('express');
const db = require('../../db');
const { verifyRole } = require('../middlewares/auth');

const router = express.Router();

// 📌 Lấy tất cả khung học
router.get('/', async (req, res) => {
    try {
        const conn = await db.promise();
        const [rows] = await conn.query('SELECT * FROM frames');
        res.status(200).json({ status: true, data: rows });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

// 📌 Lấy khung học theo ID
router.get('/:id', async (req, res) => {
    try {
        const conn = await db.promise();
        const [rows] = await conn.query('SELECT * FROM frames WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ status: false, message: 'Không tìm thấy khung học' });
        }
        res.status(200).json({ status: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

// 📌 Tạo khung học mới
router.post('/', verifyRole('admin'), async (req, res) => {
    try {
        const { frame_number, title, content } = req.body;
        const conn = await db.promise();
        const [result] = await conn.query(
            'INSERT INTO frames (frame_number, title, content, created_at) VALUES (?, ?, ?, NOW())',
            [frame_number, title, content],
        );
        const [newFrame] = await conn.query('SELECT * FROM frames WHERE id = ?', [result.insertId]);
        res.status(201).json({ status: true, data: newFrame[0] });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

// 📌 Cập nhật khung học
router.put('/:id', verifyRole('admin'), async (req, res) => {
    try {
        const { frame_number, title, content } = req.body;
        const conn = await db.promise();
        const [result] = await conn.query('UPDATE frames SET frame_number = ?, title = ?, content = ? WHERE id = ?', [
            frame_number,
            title,
            content,
            req.params.id,
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: 'Không tìm thấy khung học' });
        }
        const [updatedFrame] = await conn.query('SELECT * FROM frames WHERE id = ?', [req.params.id]);
        res.status(200).json({ status: true, data: updatedFrame[0] });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

// 📌 Xóa khung học
router.delete('/:id', verifyRole('admin'), async (req, res) => {
    try {
        const conn = await db.promise();
        const [result] = await conn.query('DELETE FROM frames WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: 'Không tìm thấy khung học' });
        }
        res.status(200).json({ status: true, message: 'Xóa khung học thành công' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

module.exports = router;
