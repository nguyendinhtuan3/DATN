const { Garden } = require("../models");

class GardenService {
  static async getAllGardens() {
    return await Garden.findAll();
  }

  static async getGardenById(id) {
    return await Garden.findByPk(id);
  }

  static async createGarden({ name, description, courseId }) {
    return await Garden.create({ name, description, courseId });
  }

  static async updateGarden(id, updates) {
    const garden = await Garden.findByPk(id);
    if (!garden) throw new Error("Garden not found");
    return await garden.update(updates);
  }

  static async deleteGarden(id) {
    const deleted = await Garden.destroy({ where: { id } });
    return deleted > 0;
  }
}

module.exports = GardenService;
