const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class GardenItem extends Model {
  static associate(models) {
    GardenItem.belongsTo(models.Garden, { foreignKey: "gardenId" });
    GardenItem.belongsTo(models.Item, { foreignKey: "itemId" });
  }
}

GardenItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    gardenId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "growing", "harvested"),
      defaultValue: "active",
    },
    plantedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    harvestedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "GardenItem",
    tableName: "garden_items",
    timestamps: true,
  }
);

module.exports = GardenItem;
