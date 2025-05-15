const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { uploadBase64Image } = require("../utils/cloudinaryUploader");
// const { sendResetPasswordEmail } = require("../utils/mailHelper");

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const userService = {
  async register(input) {
    const existing = await User.findOne({ where: { email: input.email } });
    if (existing) throw new Error("Email đã tồn tại.");
    const hashed = await bcrypt.hash(input.password, SALT_ROUNDS);
    const user = await User.create({ ...input, password: hashed });
    return user;
  },

  async loginWithEmailAndPassword(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Tài khoản không tồn tại");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Mật khẩu không đúng");

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    return { user, token };
  },

  async loginWithGoogle(idToken) {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        email,
        fullName: payload.name,
        avatarUrl: payload.picture,
        password: null,
      });
      await createDefaultMasteryRoadForUser(user.id);
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    return { user, token };
  },

  async getUserById(id) {
    return await User.findByPk(id);
  },

  async getUsers(limit = 10, offset = 0) {
    return await User.findAll({ limit, offset });
  },

  async updateUser(id, input) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("Người dùng không tồn tại");

    await user.update(input);
    return user;
  },

  async updateProfile(id, input) {
    return await this.updateUser(id, input);
  },

  async lockUser(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("Người dùng không tồn tại");

    await user.update({ status: "LOCKED" });
    return user;
  },

  async unlockUser(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("Người dùng không tồn tại");

    await user.update({ status: "ACTIVE" });
    return user;
  },

  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("Người dùng không tồn tại");

    await user.destroy();
    return true;
  },

  async forgotPassword(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Không tìm thấy người dùng");

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "15m" });
    const resetLink = `${FRONTEND_URL}/reset-password?token=${token}`;

    await sendResetPasswordEmail(email, resetLink);
    return true;
  },

  async resetPassword(token, newPassword) {
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw new Error("Token không hợp lệ hoặc đã hết hạn");
    }

    const user = await User.findByPk(payload.id);
    if (!user) throw new Error("Không tìm thấy người dùng");

    const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS);
    user.password = hashed;
    await user.save();

    return true;
  },

  async updateAvatar(userId, file, models) {
    const user = await models.User.findByPk(userId);
    if (!user) throw new Error("Người dùng không tồn tại");

    const { createReadStream, mimetype } = await file;
    const chunks = [];

    for await (const chunk of createReadStream()) chunks.push(chunk);

    const buffer = Buffer.concat(chunks);
    const base64Image = `data:${mimetype};base64,${buffer.toString("base64")}`;
    const imageUrl = await uploadBase64Image(base64Image, "avatars");

    const image = await models.Image.create({ url: imageUrl });
    user.avatarId = image.id;
    await user.save();

    return user;
  },
};

module.exports = userService;
