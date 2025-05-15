const GardenItemService = require("../services/gardenItemService");

const gardenItemResolvers = {
  Query: {
    getAllGardenItems: async () => {
      try {
        return await GardenItemService.getAllGardenItems();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getGardenItem: async (_, { id }) => {
      try {
        return await GardenItemService.getGardenItemById(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    createGardenItem: async (_, { gardenId, itemId, position }) => {
      try {
        return await GardenItemService.createGardenItem({
          gardenId,
          itemId,
          position,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = gardenItemResolvers;
