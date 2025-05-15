const Garden = require("../models/mysql/Garden");
const Land = require("../models/mysql/Land");
const Vocabulary = require("../models/mysql/Vocabulary");

const resolvers = {
  Query: {
    // Lấy thông tin Garden của người dùng
    async getGarden(_, { userId }) {
      try {
        const garden = await Garden.findOne({ userId })
          .populate("lands.vocabId")
          .populate("lands.itemId");
        if (!garden) {
          throw new Error("Garden not found");
        }
        return garden;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Lấy tất cả các Garden (dành cho admin)
    async getAllGardens() {
      try {
        const gardens = await Garden.find()
          .populate("lands.vocabId")
          .populate("lands.itemId");
        return gardens;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    // Tạo Garden mới
    async createGarden(_, { input }) {
      try {
        const { userId, lands } = input;

        // Tạo Garden mới
        const newGarden = new Garden({
          userId,
          lands,
        });

        // Lưu Garden vào database
        await newGarden.save();
        return newGarden;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Cập nhật Garden
    async updateGarden(_, { userId, input }) {
      try {
        const { lands } = input;

        // Tìm Garden của người dùng
        const garden = await Garden.findOne({ userId });
        if (!garden) {
          throw new Error("Garden not found");
        }

        // Cập nhật các mảnh đất trong vườn
        garden.lands = lands;

        // Lưu Garden đã cập nhật
        await garden.save();
        return garden;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Cập nhật thông tin Land
    async updateLand(_, { id, input }) {
      try {
        // Tìm mảnh đất theo ID
        const land = await Land.findById(id);
        if (!land) {
          throw new Error("Land not found");
        }

        // Cập nhật mảnh đất với input mới
        Object.assign(land, input);

        // Lưu mảnh đất đã cập nhật
        await land.save();
        return land;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Xóa Land
    async deleteLand(_, { id }) {
      try {
        // Tìm và xóa mảnh đất theo ID
        const land = await Land.findByIdAndDelete(id);
        if (!land) {
          throw new Error("Land not found");
        }
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Garden: {
    // Populate các trường trong Garden, chẳng hạn như lands
    async lands(parent) {
      try {
        // Tìm các mảnh đất trong Garden
        const lands = await Land.find({ _id: { $in: parent.lands } })
          .populate("vocabId")
          .populate("itemId");
        return lands;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Land: {
    async vocabId(parent) {
      try {
        const vocab = await Vocabulary.findById(parent.vocabId);
        return vocab;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async itemId(parent) {
      try {
        const item = await ShopItem.findById(parent.itemId);
        return item;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
