const { Image } = require("../models");

class ImageService {
  static async createImage({ url }) {
    return await Image.create({ url });
  }
  static async getImageById(id) {
    try {
      // Tìm kiếm ảnh theo ID
      const image = await Image.findByPk(id);
      if (!image) {
        throw new Error("Image not found");
      }
      return image;
    } catch (error) {
      throw new Error("Failed to fetch image from the database");
    }
  }
}

module.exports = ImageService;
