const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const db = require("../../db");
const { verifyRole } = require("../middlewares/auth");

const router = express.Router();
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 📌 Đăng ký
router.post("/register", async (req, res) => {
  const { name, email, password, role = "user" } = req.body;

  try {
    const conn = db.promise();

    const [existingEmails] = await conn.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (existingEmails.length > 0) {
      return res.json({ status: false, message: "Email đã được sử dụng" });
    }

    const [existingNames] = await conn.query(
      "SELECT id FROM users WHERE username = ?",
      [name]
    );
    if (existingNames.length > 0) {
      return res.json({ status: false, message: "Tên người dùng đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const [insertResult] = await conn.query(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );

    const token = jwt.sign({ id: insertResult.insertId, role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      status: true,
      token,
      user: { id: insertResult.insertId, username: name, email, role },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

// 📌 Đăng nhập
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const conn = db.promise();
    const [users] = await conn.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res
        .status(401)
        .json({ status: false, message: "Không tìm thấy người dùng" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: false, message: "Mật khẩu không đúng" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      status: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

// 📌 Gửi email quên mật khẩu
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const conn = db.promise();
    const [users] = await conn.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "Không tìm thấy người dùng" });
    }

    const user = users[0];
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "15m" });
    const resetLink = `${FRONTEND_URL}/reset-password?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Đặt lại mật khẩu",
      html: `
        <p>Chào bạn,</p>
        <p>Nhấn vào liên kết sau để đặt lại mật khẩu:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Liên kết sẽ hết hạn sau 15 phút.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.json({
      status: true,
      message: "Email đặt lại mật khẩu đã được gửi",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res
      .status(500)
      .json({ status: false, message: "Lỗi khi gửi email" });
  }
});

// 📌 Đặt lại mật khẩu
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Thiếu token hoặc mật khẩu" });
    }

    const payload = jwt.verify(token, JWT_SECRET);
    const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS);

    const conn = db.promise();
    await conn.query("UPDATE users SET password = ? WHERE id = ?", [
      hashed,
      payload.id,
    ]);

    return res.json({
      status: true,
      message: "Mật khẩu đã được đặt lại thành công",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res
      .status(400)
      .json({ status: false, message: "Token không hợp lệ hoặc đã hết hạn" });
  }
});
// 📌 Cập nhật người dùng chỉ theo id
router.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const { username, email, avatar } = req.body;

  try {
    const conn = db.promise();

    const updateFields = [];
    const updateValues = [];

    if (username) {
      updateFields.push("username = ?");
      updateValues.push(username);
    }
    if (email) {
      updateFields.push("email = ?");
      updateValues.push(email);
    }
    if (avatar) {
      updateFields.push("avatar = ?");
      updateValues.push(avatar);
    }
    if (updateFields.length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "Không có dữ liệu cập nhật" });
    }

    updateValues.push(userId);

    const sql = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;
    await conn.query(sql, updateValues);

    const [updatedUsers] = await conn.query(
      "SELECT id, username, email, avatar, role FROM users WHERE id = ?",
      [userId]
    );

    return res.json({
      status: true,
      user: updatedUsers[0],
      message: "Cập nhật thành công",
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({ status: false, message: "Lỗi máy chủ" });
  }
});

// 📌 Lấy danh sách người dùng (chỉ admin)
router.get("/users", verifyRole("Admin"), async (req, res) => {
  try {
    const conn = db.promise();
    const [users] = await conn.query(
      "SELECT id, username, email, role FROM users"
    );
    return res.json({ status: true, users });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
});

// 📌 Gán quyền
router.post("/assign-role", verifyRole("Admin"), async (req, res) => {
  const { id, role } = req.body;

  if (!["Admin", "User", "Giảng viên"].includes(role)) {
    return res
      .status(400)
      .json({ status: false, message: "Vai trò không hợp lệ" });
  }

  try {
    const conn = db.promise();
    await conn.query("UPDATE users SET role = ? WHERE id = ?", [role, id]);
    return res.json({ status: true, message: "Gán quyền thành công" });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
});

// 📌 Xóa quyền (trả về User)
router.delete("/remove-role", verifyRole("Admin"), async (req, res) => {
  const { id } = req.body;

  try {
    const conn = db.promise();
    await conn.query("UPDATE users SET role = 'User' WHERE id = ?", [id]);
    return res.json({ status: true, message: "Xóa quyền thành công" });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
});

module.exports = router;
