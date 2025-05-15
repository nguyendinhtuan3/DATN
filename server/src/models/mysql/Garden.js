const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Garden extends Model {
  static associate(models) {
    Garden.belongsTo(models.Course, {
      foreignKey: "courseId",
      allowNull: true,
      as: "course",
    });
    Garden.hasMany(models.GardenItem, {
      foreignKey: "gardenId",
      as: "items",
    });
    Garden.hasMany(models.Land, {
      foreignKey: "gardenId",
      as: "lands",
    });
  }
}

Garden.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Garden",
    tableName: "gardens",
    timestamps: true,
  }
);

module.exports = Garden;
