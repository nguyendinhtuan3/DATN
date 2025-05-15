const { GardenItem } = require("../models");

class GardenItemService {
  static async createGardenItem({ gardenId, itemId, position }) {
    return await GardenItem.create({
      gardenId,
      itemId,
      position,
    });
  }

  static async getAllGardenItems() {
    return await GardenItem.findAll();
  }

  static async getGardenItemById(id) {
    return await GardenItem.findByPk(id);
  }
}

module.exports = GardenItemService;
