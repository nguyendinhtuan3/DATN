const LandItemService = require("../services/landItemService");

const landItemResolvers = {
  Query: {
    getAllLandItems: async () => {
      try {
        return await LandItemService.getAllLandItems();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getLandItem: async (_, { id }) => {
      try {
        return await LandItemService.getLandItemById(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    createLandItem: async (_, { gardenItemId, landId }) => {
      try {
        return await LandItemService.createLandItem({ gardenItemId, landId });
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = landItemResolvers;
