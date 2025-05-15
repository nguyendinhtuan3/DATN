const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class UserItem extends Model {
  static associate(models) {
    UserItem.belongsTo(models.User, {
      foreignKey: "userId",
      allowNull: false,
    });
    UserItem.belongsTo(models.Item, {
      foreignKey: "itemId",
      allowNull: false,
    });
  }
}

UserItem.init(
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
    itemId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "UserItem",
    tableName: "user_items",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "itemId"],
      },
    ],
  }
);

module.exports = UserItem;
