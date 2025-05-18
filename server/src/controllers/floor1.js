const express = require('express');
const db = require('../../db');
const { verifyRole } = require('../middlewares/auth');

const router = express.Router();

// 📌 Lấy tất cả câu hỏi Picture Matching
router.get('/', async (req, res) => {
    try {
        const conn = db.promise();
        const [rows] = await conn.query(`SELECT * FROM floor1_picture_match`);
        res.status(200).json({ status: true, data: rows });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

// 📌 Lấy câu hỏi theo ID
router.get('/:id', async (req, res) => {
    try {
        const conn = db.promise();
        const [rows] = await conn.query(`SELECT * FROM floor1_picture_match WHERE id = ?`, [req.params.id]);
        if (rows.length > 0) {
            res.status(200).json({ status: true, data: rows[0] });
        } else {
            res.status(404).json({ status: false, message: 'Không tìm thấy câu hỏi' });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

// 📌 Tạo mới (admin)
router.post('/', verifyRole('admin'), async (req, res) => {
    try {
        const { image_url, audio_url, options, correct_answer } = req.body;
        const conn = db.promise();
        const [result] = await conn.query(
            `INSERT INTO floor1_picture_match (image_url, audio_url, options, correct_answer) VALUES (?, ?, ?, ?)`,
            [image_url, audio_url, JSON.stringify(options), correct_answer],
        );
        res.status(201).json({ status: true, message: 'Tạo câu hỏi thành công', id: result.insertId });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

// 📌 Cập nhật (admin)
router.put('/:id', verifyRole('admin'), async (req, res) => {
    try {
        const { image_url, audio_url, options, correct_answer } = req.body;
        const conn = db.promise();
        const [result] = await conn.query(
            `UPDATE floor1_picture_match SET image_url = ?, audio_url = ?, options = ?, correct_answer = ? WHERE id = ?`,
            [image_url, audio_url, JSON.stringify(options), correct_answer, req.params.id],
        );
        if (result.affectedRows > 0) {
            res.status(200).json({ status: true, message: 'Cập nhật câu hỏi thành công' });
        } else {
            res.status(404).json({ status: false, message: 'Không tìm thấy câu hỏi để cập nhật' });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

// 📌 Xóa (admin)
router.delete('/:id', verifyRole('admin'), async (req, res) => {
    try {
        const conn = db.promise();
        const [result] = await conn.query(`DELETE FROM floor1_picture_match WHERE id = ?`, [req.params.id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ status: true, message: 'Xóa câu hỏi thành công' });
        } else {
            res.status(200).json({ status: false, message: 'Không tìm thấy câu hỏi để xóa' });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

module.exports = router;
