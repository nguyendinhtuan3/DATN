const miniTestService = require("../services/miniTestService");

const miniTestResolver = {
  Query: {
    getMiniTest: async (_, { id }) => {
      return await miniTestService.getMiniTestById(id);
    },
    getAllMiniTests: async (_, { towerId }) => {
      return await miniTestService.getMiniTestsByTower(towerId);
    },
  },
  Mutation: {
    createMiniTest: async (
      _,
      { name, description, timeLimit, towerId, passScore }
    ) => {
      const miniTestData = { name, description, timeLimit, towerId, passScore };
      return await miniTestService.createMiniTest(miniTestData);
    },
    updateMiniTest: async (
      _,
      { id, name, description, timeLimit, passScore }
    ) => {
      const miniTestData = { name, description, timeLimit, passScore };
      return await miniTestService.updateMiniTest(id, miniTestData);
    },
    deleteMiniTest: async (_, { id }) => {
      return await miniTestService.deleteMiniTest(id);
    },
  },
};

module.exports = miniTestResolver;
