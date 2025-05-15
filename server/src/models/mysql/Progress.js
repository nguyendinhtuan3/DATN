const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Progress extends Model {}

Progress.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    lessonId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Progress",
    tableName: "progresses",
    timestamps: true,
  }
);

module.exports = Progress;
