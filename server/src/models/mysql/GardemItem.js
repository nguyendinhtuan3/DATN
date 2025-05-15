const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class GardenItem extends Model {
  static associate(models) {
    GardenItem.belongsTo(models.Garden, {
      foreignKey: "gardenId",
      as: "garden",
    });
    GardenItem.belongsTo(models.Item, {
      foreignKey: "itemId",
      as: "item",
    });
    GardenItem.hasOne(models.LandItem, {
      foreignKey: "gardenItemId",
      as: "landItem",
    });
  }
}

GardenItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    gardenId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "gardens",
        key: "id",
      },
    },
    itemId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "items",
        key: "id",
      },
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "GardenItem",
    tableName: "garden_items",
    timestamps: false,
  }
);

module.exports = GardenItem;
