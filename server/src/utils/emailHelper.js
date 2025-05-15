const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Gửi email tổng quát
 * @param {Object} options
 * @param {string} options.to
 * @param {string} options.subject
 * @param {string} options.html
 */
const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"TOEIC Gamification" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`✅ Email sent to ${to}:`, info.messageId);
    return info;
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error);
    throw new Error("Không thể gửi email. Vui lòng thử lại sau.");
  }
};

/**
 * Gửi email đặt lại mật khẩu
 * @param {string} to - Email người dùng
 * @param {string} resetLink - Đường link reset password kèm token
 */
const sendResetPasswordEmail = async (to, resetLink) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
      <h2 style="color: #1d4ed8;">TOEIC Gamification - Đặt lại mật khẩu</h2>
      <p>Chào bạn,</p>
      <p>Bạn đã yêu cầu đặt lại mật khẩu. Nhấn vào nút bên dưới để tiếp tục:</p>
      <a href="${resetLink}" style="
        display: inline-block;
        background-color: #1d4ed8;
        color: #ffffff;
        padding: 12px 20px;
        border-radius: 6px;
        text-decoration: none;
        margin: 20px 0;
      ">Đặt lại mật khẩu</a>
      <p>Liên kết sẽ hết hạn sau 15 phút. Nếu không phải bạn yêu cầu, hãy bỏ qua email này.</p>
      <hr style="margin: 30px 0;" />
      <p style="font-size: 0.9em; color: #6b7280;">TOEIC Gamification - Rèn luyện mỗi ngày, tiến tới 990!</p>
    </div>
  `;
  return await sendEmail({
    to,
    subject: "🔐 Đặt lại mật khẩu TOEIC Gamification",
    html,
  });
};

module.exports = {
  sendEmail,
  sendResetPasswordEmail,
};
