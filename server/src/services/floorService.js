const { Floor, MiniGame, Tower } = require("../models");

class FloorService {
  static async getFloorById(id) {
    return await Floor.findByPk(id, {
      include: [
        { model: MiniGame, as: "miniGame" },
        { model: Tower, as: "tower" },
      ],
    });
  }

  static async getAllFloorsByTowerId(towerId) {
    return await Floor.findAll({
      where: { towerId },
      include: [{ model: MiniGame, as: "miniGame" }],
    });
  }

  static async getAllFloorsByMiniGameId(miniGameId) {
    return await Floor.findAll({
      where: { miniGameId },
      include: [{ model: Tower, as: "tower" }],
    });
  }

  static async createFloor({ towerId, floor, miniGameId, toeicScore }) {
    return await Floor.create({ towerId, floor, miniGameId, toeicScore });
  }

  static async updateFloor({ id, ...rest }) {
    const floor = await Floor.findByPk(id);
    if (!floor) throw new Error("Floor not found");
    await floor.update(rest);
    return floor;
  }

  static async deleteFloor(id) {
    const floor = await Floor.findByPk(id);
    if (!floor) throw new Error("Floor not found");
    await floor.destroy();
    return true;
  }
}

module.exports = FloorService;
