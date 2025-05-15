const { LandItem } = require("../models");

class LandItemService {
  static async createLandItem({ gardenItemId, landId }) {
    return await LandItem.create({
      gardenItemId,
      landId,
    });
  }

  static async getAllLandItems() {
    return await LandItem.findAll();
  }

  static async getLandItemById(id) {
    return await LandItem.findByPk(id);
  }
}

module.exports = LandItemService;
