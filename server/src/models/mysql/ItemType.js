const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class ItemType extends Model {}

ItemType.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "ItemType",
    tableName: "item_types",
    timestamps: true,
  }
);

module.exports = ItemType;
