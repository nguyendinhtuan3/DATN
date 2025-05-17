const express = require('express');
const db = require('../../db');
const { verifyRole } = require('../middlewares/auth');

const router = express.Router();

// Helper function to determine status based on completed_count
function calculateStatus(completed_count) {
    if (completed_count >= 5) return 'flower';
    if (completed_count >= 3) return 'sprout';
    return 'seed';
}

// Get all user frame items with related data
router.get('/', verifyRole('student'), async (req, res) => {
    try {
        const conn = await db.promise();
        const [rows] = await conn.query(`
            SELECT ufi.id, ufi.user_id, ufi.frame_id, ufi.completed_count, ufi.status, ufi.last_updated,
                   u.username, f.title AS frame_title
            FROM user_frame_items ufi
            JOIN users u ON ufi.user_id = u.id
            JOIN frames f ON ufi.frame_id = f.id
            GROUP BY ufi.id, ufi.user_id, ufi.frame_id, ufi.completed_count, ufi.status, ufi.last_updated, u.username, f.title
        `);
        res.status(200).json({ status: true, data: rows });
    } catch (error) {
        console.error('Error fetching user frame items:', error);
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
});

// Get user frame item by ID
router.get('/:id', verifyRole('student'), async (req, res) => {
    try {
        const conn = await db.promise();
        const [rows] = await conn.query(
            `
            SELECT ufi.id, ufi.user_id, ufi.frame_id, ufi.completed_count, ufi.status, ufi.last_updated,
                   u.username, f.title AS frame_title
            FROM user_frame_items ufi
            JOIN users u ON ufi.user_id = u.id
            JOIN frames f ON ufi.frame_id = f.id
            WHERE ufi.id = ?
            GROUP BY ufi.id, ufi.user_id, ufi.frame_id, ufi.completed_count, ufi.status, ufi.last_updated, u.username, f.title
        `,
            [req.params.id],
        );

        if (rows.length === 0) {
            return res.status(404).json({ status: false, message: 'Item not found' });
        }
        res.status(200).json({ status: true, data: rows[0] });
    } catch (error) {
        console.error('Error fetching user frame item:', error);
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
});

router.put('/:id?', verifyRole('student'), async (req, res) => {
    try {
        const { frame_id, completed_count = 0 } = req.body;
        const id = req.params.id;
        const user_id = req.user.id;
        // Xác thực các trường bắt buộc
        if (!user_id || !frame_id) {
            return res.status(400).json({
                status: false,
                message: 'Missing required fields: user_id or frame_id',
            });
        }

        // Đảm bảo completed_count không âm
        if (completed_count < 0) {
            return res.status(400).json({
                status: false,
                message: 'completed_count cannot be negative',
            });
        }

        const conn = await db.promise();
        const status = calculateStatus(completed_count);
        let itemId;
        await conn.query('START TRANSACTION');
        if (id) {
            // Cập nhật item
            const [result] = await conn.query(
                `
                UPDATE user_frame_items
                SET frame_id = ?, completed_count = ?, status = ?, last_updated = NOW()
                WHERE id = ? AND user_id = ?
            `,
                [frame_id, completed_count, status, id, user_id],
            );

            if (result.affectedRows === 0) {
                await conn.query('ROLLBACK');
                return res.status(404).json({
                    status: false,
                    message: 'Item not found or you do not have permission to update it',
                });
            }
            itemId = id;
        } else {
            // Tạo item mới
            const [result] = await conn.query(
                `
                INSERT INTO user_frame_items (user_id, frame_id, completed_count, status, last_updated)
                VALUES (?, ?, ?, ?, NOW())
            `,
                [user_id, frame_id, completed_count, status],
            );
            itemId = result.insertId;
        }

        // Lấy thông tin item
        const [updatedItem] = await conn.query(
            `
            SELECT ufi.id, ufi.user_id, ufi.frame_id, ufi.completed_count, ufi.status, ufi.last_updated,
                   u.username, f.title AS frame_title
            FROM user_frame_items ufi
            JOIN users u ON ufi.user_id = u.id
            JOIN frames f ON ufi.frame_id = f.id
            WHERE ufi.id = ?
        `,
            [itemId],
        );

        await conn.query('COMMIT');

        if (!updatedItem[0]) {
            return res.status(404).json({
                status: false,
                message: 'Failed to retrieve item',
            });
        }

        res.status(200).json({ status: true, data: updatedItem[0] });
    } catch (error) {
        await db.promise().query('ROLLBACK');
        console.error('Error:', error);
        res.status(500).json({
            status: false,
            message: 'Server error',
            error: error.message,
        });
    }
});

// Delete user frame item by ID
router.delete('/:id', verifyRole(['admin']), async (req, res) => {
    try {
        const conn = await db.promise();

        // Delete associated vocabulary records if table exists
        try {
            await conn.query(
                `
                DELETE FROM user_frame_item_vocabularies
                WHERE user_frame_item_id = ?
            `,
                [req.params.id],
            );
        } catch (vocabError) {
            if (vocabError.code === 'ER_NO_SUCH_TABLE') {
                console.warn('Table user_frame_item_vocabularies does not exist, skipping vocabulary deletion');
            } else {
                throw vocabError;
            }
        }

        // Delete the item
        const [result] = await conn.query(
            `
            DELETE FROM user_frame_items
            WHERE id = ?
        `,
            [req.params.id],
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: 'Item not found' });
        }

        res.status(200).json({ status: true, message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting user frame item:', error);
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
});

module.exports = router;
