const { Tower, Floor } = require("../models");

class TowerService {
  // Lấy tất cả Towers
  static async getAllTowers() {
    try {
      return await Tower.findAll({
        include: [{ model: Floor, as: "floors" }],
      });
    } catch (error) {
      throw new Error("Error fetching Towers");
    }
  }

  // Lấy Tower theo ID
  static async getTowerById(id) {
    try {
      return await Tower.findByPk(id, {
        include: [{ model: Floor, as: "floors" }],
      });
    } catch (error) {
      throw new Error("Error fetching Tower by ID");
    }
  }

  // Tạo Tower mới
  static async createTower({ name, description, userId }) {
    try {
      return await Tower.create({ name, description, userId, exp: 0 });
    } catch (error) {
      throw new Error("Error creating Tower");
    }
  }
}

module.exports = TowerService;
