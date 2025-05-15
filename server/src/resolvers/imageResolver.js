const { GraphQLUpload } = require("graphql-upload");
const cloudinary = require("../config/cloudinary");
const ImageService = require("../services/imageService");

const imageResolvers = {
  Upload: GraphQLUpload,

  Mutation: {
    uploadImage: async (_, { file, itemId, landId, userId }) => {
      try {
        const { createReadStream, filename } = await file;
        const stream = createReadStream();

        // Upload lên Cloudinary
        const result = await new Promise((resolve, reject) => {
          const cloudStream = cloudinary.uploader.upload_stream(
            {
              folder: "images-toeic",
              public_id: filename,
              resource_type: "image",
            },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
                return reject(
                  new Error("Failed to upload image to Cloudinary")
                );
              }
              resolve(result);
            }
          );
          stream.pipe(cloudStream);
        });

        // Lưu vào DB
        const image = await ImageService.createImage({
          url: result.secure_url,
          itemId,
          landId,
          userId,
        });

        return image;
      } catch (error) {
        console.error("Error in uploadImage mutation:", error);
        throw new Error("Failed to upload image");
      }
    },

    createImage: async (_, { input }) => {
      return await ImageService.createImage(input);
    },

    updateImage: async (_, { input }) => {
      return await ImageService.updateImage(input);
    },

    deleteImage: async (_, { id }) => {
      return await ImageService.deleteImage(id);
    },
  },

  Query: {
    getImage: async (_, { id }) => {
      const image = await ImageService.getImageById(id);
      if (!image) {
        throw new Error(`Image with id ${id} not found`);
      }
      return image;
    },

    getImagesByItem: async (_, { itemId }) => {
      return await ImageService.getImagesByItem(itemId);
    },

    getImagesByLand: async (_, { landId }) => {
      return await ImageService.getImagesByLand(landId);
    },
  },
};

module.exports = imageResolvers;
