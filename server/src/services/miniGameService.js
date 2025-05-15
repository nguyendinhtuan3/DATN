const { MiniGame } = require("../models");

class MiniGameService {
  // Lấy tất cả MiniGames
  static async getAllMiniGames() {
    try {
      return await MiniGame.findAll();
    } catch (error) {
      throw new Error("Error fetching MiniGames");
    }
  }

  // Lấy MiniGame theo ID
  static async getMiniGameById(id) {
    try {
      return await MiniGame.findByPk(id);
    } catch (error) {
      throw new Error("Error fetching MiniGame by ID");
    }
  }

  // Tạo MiniGame mới
  static async createMiniGame({ name, description }) {
    try {
      return await MiniGame.create({ name, description });
    } catch (error) {
      throw new Error("Error creating MiniGame");
    }
  }

  // Cập nhật MiniGame
  static async updateMiniGame(id, { name, description }) {
    try {
      const miniGame = await MiniGame.findByPk(id);
      if (!miniGame) throw new Error("MiniGame not found");

      miniGame.name = name;
      miniGame.description = description;
      await miniGame.save();
      return miniGame;
    } catch (error) {
      throw new Error("Error updating MiniGame");
    }
  }

  // Xóa MiniGame
  static async deleteMiniGame(id) {
    try {
      const miniGame = await MiniGame.findByPk(id);
      if (!miniGame) throw new Error("MiniGame not found");

      await miniGame.destroy();
      return true;
    } catch (error) {
      throw new Error("Error deleting MiniGame");
    }
  }
}

module.exports = MiniGameService;
