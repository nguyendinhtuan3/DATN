const express = require('express');
const db = require('../../db');
const { verifyRole } = require('../middlewares/auth');

const router = express.Router();

// 📌 Lấy tất cả quan hệ khung-từ vựng
router.get('/', async (req, res) => {
    try {
        const conn = await db.promise();
        const [rows] = await conn.query(`
            SELECT fv.*, f.title AS frame_title, v.english_word, v.vietnamese_word
            FROM frame_vocabulary fv
            JOIN frames f ON fv.frame_id = f.id
            JOIN vocabulary v ON fv.vocab_id = v.id
        `);
        res.status(200).json({ status: true, data: rows });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

// 📌 Lấy quan hệ khung-từ vựng theo ID
router.get('/by-frame/:frameId', async (req, res) => {
    try {
        const conn = await db.promise();
        const [rows] = await conn.query(
            `
            SELECT fv.*, f.title AS frame_title, v.english_word, v.vietnamese_word, v.part_of_speech
            FROM frame_vocabulary fv
            JOIN frames f ON fv.frame_id = f.id
            JOIN vocabulary v ON fv.vocab_id = v.id
            WHERE fv.frame_id = ?
            `,
            [req.params.frameId],
        );

        if (rows.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'Không tìm thấy từ vựng nào cho frame này',
            });
        }

        res.status(200).json({ status: true, data: rows });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Lỗi máy chủ',
            details: error.message,
        });
    }
});

// 📌 Tạo quan hệ khung-từ vựng mới
router.post('/', verifyRole('admin'), async (req, res) => {
    try {
        const { frame_id, vocab_id, position } = req.body;
        const conn = await db.promise();
        const [result] = await conn.query(
            'INSERT INTO frame_vocabulary (frame_id, vocab_id, position) VALUES (?, ?, ?)',
            [frame_id, vocab_id, position],
        );
        const [newRelation] = await conn.query('SELECT * FROM frame_vocabulary WHERE id = ?', [result.insertId]);
        res.status(201).json({ status: true, data: newRelation[0] });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

// 📌 Cập nhật quan hệ khung-từ vựng
router.put('/:id', verifyRole('admin'), async (req, res) => {
    try {
        const { frame_id, vocab_id, position } = req.body;
        const conn = await db.promise();
        const [result] = await conn.query(
            'UPDATE frame_vocabulary SET frame_id = ?, vocab_id = ?, position = ? WHERE id = ?',
            [frame_id, vocab_id, position, req.params.id],
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: 'Không tìm thấy quan hệ khung-từ vựng' });
        }
        const [updatedRelation] = await conn.query('SELECT * FROM frame_vocabulary WHERE id = ?', [req.params.id]);
        res.status(200).json({ status: true, data: updatedRelation[0] });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

// 📌 Xóa quan hệ khung-từ vựng
router.delete('/:id', verifyRole('admin'), async (req, res) => {
    try {
        const conn = await db.promise();
        const [result] = await conn.query('DELETE FROM frame_vocabulary WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: 'Không tìm thấy quan hệ khung-từ vựng' });
        }
        res.status(200).json({ status: true, message: 'Xóa quan hệ khung-từ vựng thành công' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

module.exports = router;
