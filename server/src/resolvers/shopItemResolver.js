const { ShopItem } = require("../models");

const resolvers = {
  Query: {
    getShopItemById: async (_, { id }) => {
      return await ShopItem.findByPk(id);
    },
    getAllShopItems: async () => {
      return await ShopItem.findAll();
    },
  },
  Mutation: {
    createShopItem: async (
      _,
      { name, price, description, image, quantity }
    ) => {
      return await ShopItem.create({
        name,
        price,
        description,
        image,
        quantity,
      });
    },
    updateShopItem: async (
      _,
      { id, name, price, description, image, quantity, status }
    ) => {
      const shopItem = await ShopItem.findByPk(id);
      if (!shopItem) {
        throw new Error("ShopItem not found");
      }
      return await shopItem.update({
        name,
        price,
        description,
        image,
        quantity,
        status,
      });
    },
    deleteShopItem: async (_, { id }) => {
      const shopItem = await ShopItem.findByPk(id);
      if (!shopItem) {
        throw new Error("ShopItem not found");
      }
      await shopItem.destroy();
      return shopItem;
    },
  },
};

module.exports = resolvers;
