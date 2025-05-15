const FloorService = require("../services/floorService");

const floorResolvers = {
  Query: {
    getFloorById: async (_, { id }) => {
      return await FloorService.getFloorById(id);
    },
    getFloorsByTower: async (_, { towerId }) => {
      return await FloorService.getAllFloorsByTowerId(towerId);
    },
    getFloorsByMiniGame: async (_, { miniGameId }) => {
      return await FloorService.getAllFloorsByMiniGameId(miniGameId);
    },
  },

  Mutation: {
    createFloor: async (_, { input }) => {
      return await FloorService.createFloor(input);
    },
    updateFloor: async (_, { input }) => {
      return await FloorService.updateFloor(input);
    },
    deleteFloor: async (_, { input }) => {
      return await FloorService.deleteFloor(input.id);
    },
  },

  Floor: {
    miniGame: async (parent) => {
      return await parent.getMiniGame(); // Sequelize magic method
    },
    tower: async (parent) => {
      return await parent.getTower();
    },
  },
};

module.exports = floorResolvers;
