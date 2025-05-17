const express = require('express');
const db = require('../../db');
const { verifyRole } = require('../middlewares/auth');

const router = express.Router();

// 📌 Lấy tất cả từ vựng
router.get('/', async (req, res) => {
    try {
        const conn = await db.promise();
        const [rows] = await conn.query('SELECT * FROM vocabulary');
        res.status(200).json({ status: true, data: rows });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

// 📌 Lấy từ vựng theo ID
router.get('/:id', async (req, res) => {
    try {
        const conn = await db.promise();
        const [rows] = await conn.query('SELECT * FROM vocabulary WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ status: false, message: 'Không tìm thấy từ vựng' });
        }
        res.status(200).json({ status: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

// 📌 Tạo từ vựng mới
router.post('/', verifyRole('admin'), async (req, res) => {
    try {
        const {
            english_word,
            vietnamese_word,
            part_of_speech,
            image_seed_url,
            image_sprout_url,
            image_flower_url,
            audio_url,
        } = req.body;
        const conn = await db.promise();
        const [result] = await conn.query(
            'INSERT INTO vocabulary (english_word, vietnamese_word, part_of_speech, image_seed_url, image_sprout_url, image_flower_url, audio_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                english_word,
                vietnamese_word,
                part_of_speech,
                image_seed_url,
                image_sprout_url,
                image_flower_url,
                audio_url,
            ],
        );
        const [newVocab] = await conn.query('SELECT * FROM vocabulary WHERE id = ?', [result.insertId]);
        res.status(201).json({ status: true, data: newVocab[0] });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

// 📌 Cập nhật từ vựng
router.put('/:id', verifyRole('admin'), async (req, res) => {
    try {
        const {
            english_word,
            vietnamese_word,
            part_of_speech,
            image_seed_url,
            image_sprout_url,
            image_flower_url,
            audio_url,
        } = req.body;
        const conn = await db.promise();
        const [result] = await conn.query(
            'UPDATE vocabulary SET english_word = ?, vietnamese_word = ?, part_of_speech = ?, image_seed_url = ?, image_sprout_url = ?, image_flower_url = ?, audio_url = ? WHERE id = ?',
            [
                english_word,
                vietnamese_word,
                part_of_speech,
                image_seed_url,
                image_sprout_url,
                image_flower_url,
                audio_url,
                req.params.id,
            ],
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: 'Không tìm thấy từ vựng' });
        }
        const [updatedVocab] = await conn.query('SELECT * FROM vocabulary WHERE id = ?', [req.params.id]);
        res.status(200).json({ status: true, data: updatedVocab[0] });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

// 📌 Xóa từ vựng
router.delete('/:id', verifyRole('admin'), async (req, res) => {
    try {
        const conn = await db.promise();
        const [result] = await conn.query('DELETE FROM vocabulary WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: 'Không tìm thấy từ vựng' });
        }
        res.status(200).json({ status: true, message: 'Xóa từ vựng thành công' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', details: error.message });
    }
});

module.exports = router;
