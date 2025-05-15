const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Audio extends Model {}

Audio.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Audio",
    tableName: "audios",
    timestamps: false,
  }
);

module.exports = Audio;
