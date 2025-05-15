const { ItemService } = require("../services/itemService");
const { AuthenticationError } = require("apollo-server-express");

const itemResolver = {
  Query: {
    // Lấy tất cả vật phẩm của người dùng
    async getItemsByUserId(_, { userId }) {
      try {
        const items = await Item.findAll({ where: { userId: userId } });
        return items;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    // Sử dụng vật phẩm
    async useItem(_, { userId, itemId }) {
      try {
        // Kiểm tra tính hợp lệ của vật phẩm và người dùng
        const { item, user } = await ItemService.validateItemUsage(
          userId,
          itemId
        );

        // Nếu người dùng không hợp lệ hoặc không có quyền sử dụng vật phẩm, throw error
        if (!user) {
          throw new AuthenticationError(
            "Người dùng không hợp lệ hoặc không có quyền sử dụng vật phẩm."
          );
        }

        // Sử dụng vật phẩm
        const result = await ItemService.useItem(userId, itemId);

        return result;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = itemResolver;
