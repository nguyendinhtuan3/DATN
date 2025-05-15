const MiniGameService = require("../services/miniGameService");
const { ApolloError } = require("apollo-server-errors"); // Import ApolloError

const miniGameResolvers = {
  Query: {
    // Lấy tất cả MiniGames
    getAllMiniGames: async () => {
      try {
        const miniGames = await MiniGameService.getAllMiniGames();
        if (!miniGames || miniGames.length === 0) {
          throw new ApolloError(
            "Không có mini game nào.",
            "MINIGAMES_NOT_FOUND"
          );
        }
        return miniGames;
      } catch (error) {
        throw new ApolloError(
          "Có lỗi khi lấy danh sách mini games.",
          "GET_MINIGAMES_ERROR",
          { error }
        );
      }
    },

    // Lấy MiniGame theo ID
    getMiniGame: async (_, { id }) => {
      try {
        const miniGame = await MiniGameService.getMiniGameById(id);
        if (!miniGame) {
          throw new ApolloError(
            `Mini game với ID ${id} không tồn tại.`,
            "MINIGAME_NOT_FOUND"
          );
        }
        return miniGame;
      } catch (error) {
        throw new ApolloError(
          "Có lỗi khi lấy thông tin mini game.",
          "GET_MINIGAME_ERROR",
          { error }
        );
      }
    },
  },

  Mutation: {
    // Tạo MiniGame mới
    createMiniGame: async (_, { name, description }) => {
      // Kiểm tra đầu vào
      if (!name || !description) {
        throw new ApolloError(
          "Tên và mô tả của mini game là bắt buộc.",
          "VALIDATION_ERROR"
        );
      }

      try {
        const miniGame = await MiniGameService.createMiniGame({
          name,
          description,
        });
        return miniGame;
      } catch (error) {
        throw new ApolloError(
          "Có lỗi khi tạo mini game.",
          "CREATE_MINIGAME_ERROR",
          { error }
        );
      }
    },

    // Cập nhật MiniGame
    updateMiniGame: async (_, { id, name, description }) => {
      // Kiểm tra đầu vào
      if (!name || !description) {
        throw new ApolloError(
          "Tên và mô tả của mini game là bắt buộc.",
          "VALIDATION_ERROR"
        );
      }

      try {
        const updatedMiniGame = await MiniGameService.updateMiniGame(id, {
          name,
          description,
        });
        if (!updatedMiniGame) {
          throw new ApolloError(
            `Không thể cập nhật mini game với ID ${id}.`,
            "UPDATE_MINIGAME_ERROR"
          );
        }
        return updatedMiniGame;
      } catch (error) {
        throw new ApolloError(
          "Có lỗi khi cập nhật mini game.",
          "UPDATE_MINIGAME_ERROR",
          { error }
        );
      }
    },

    // Xóa MiniGame
    deleteMiniGame: async (_, { id }) => {
      try {
        const deleted = await MiniGameService.deleteMiniGame(id);
        if (!deleted) {
          throw new ApolloError(
            `Không thể xoá mini game với ID ${id}.`,
            "DELETE_MINIGAME_ERROR"
          );
        }
        return deleted;
      } catch (error) {
        throw new ApolloError(
          "Có lỗi khi xoá mini game.",
          "DELETE_MINIGAME_ERROR",
          { error }
        );
      }
    },
  },
};

module.exports = miniGameResolvers;
