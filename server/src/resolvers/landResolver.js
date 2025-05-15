const resolvers = {
  Query: {
    getLand: async (_, { id }, { models }) => {
      return models.Land.findByPk(id); // Tìm một Land theo ID
    },
    getAllLands: async (_, __, { models }) => {
      return models.Land.findAll(); // Lấy tất cả Lands
    },
  },
  Mutation: {
    createLand: async (_, { input }, { models }) => {
      return models.Land.create(input); // Tạo mới một Land
    },
    updateLand: async (_, { id, input }, { models }) => {
      const land = await models.Land.findByPk(id);
      if (!land) {
        throw new Error("Land not found");
      }
      return land.update(input); // Cập nhật Land
    },
    deleteLand: async (_, { id }, { models }) => {
      const land = await models.Land.findByPk(id);
      if (!land) {
        throw new Error("Land not found");
      }
      await land.destroy(); // Xóa Land
      return true;
    },
    lockLand: async (_, { id }, { models }) => {
      const land = await models.Land.findByPk(id);
      if (!land) {
        throw new Error("Land not found");
      }
      return land.update({ isLocked: true }); // Khóa đất
    },
    unlockLand: async (_, { id }, { models }) => {
      const land = await models.Land.findByPk(id);
      if (!land) {
        throw new Error("Land not found");
      }
      return land.update({ isLocked: false }); // Mở khóa đất
    },
  },
};

module.exports = resolvers;
