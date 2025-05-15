const TowerService = require("../services/towerService");

const towerResolvers = {
  Query: {
    // Lấy tất cả Towers
    getAllTowers: async () => {
      try {
        return await TowerService.getAllTowers();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    // Lấy Tower theo ID
    getTower: async (_, { id }) => {
      try {
        return await TowerService.getTowerById(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    // Tạo Tower mới
    createTower: async (_, { name, description, userId }) => {
      try {
        return await TowerService.createTower({ name, description, userId });
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = towerResolvers;
