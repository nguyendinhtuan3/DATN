const Audio = require("../models/mysql/Audio"); // Import model Audio

const audioResolvers = {
  Query: {
    // Lấy thông tin audio theo ID
    getAudioById: async (_, { id }) => {
      try {
        const audio = await Audio.findByPk(id); // Tìm audio theo ID
        if (!audio) {
          throw new Error("Audio not found!");
        }
        return audio;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    // Lấy tất cả các audio
    getAllAudios: async () => {
      try {
        const audios = await Audio.findAll(); // Lấy tất cả các audio
        return audios;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },

  Mutation: {
    // Tạo mới audio
    createAudio: async (_, { input }) => {
      try {
        const newAudio = await Audio.create({
          url: input.url,
          public_id: input.public_id,
        });
        return {
          success: true,
          message: "Audio created successfully",
          data: newAudio,
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
          data: null,
        };
      }
    },

    // Cập nhật thông tin audio
    updateAudio: async (_, { id, input }) => {
      try {
        const audio = await Audio.findByPk(id);
        if (!audio) {
          throw new Error("Audio not found!");
        }

        const updatedAudio = await audio.update({
          url: input.url,
          public_id: input.public_id,
        });

        return {
          success: true,
          message: "Audio updated successfully",
          data: updatedAudio,
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
          data: null,
        };
      }
    },

    // Xóa audio theo ID
    deleteAudio: async (_, { id }) => {
      try {
        const audio = await Audio.findByPk(id);
        if (!audio) {
          throw new Error("Audio not found!");
        }

        await audio.destroy(); // Xóa audio
        return {
          success: true,
          message: "Audio deleted successfully",
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
        };
      }
    },
  },
};

module.exports = audioResolvers;
