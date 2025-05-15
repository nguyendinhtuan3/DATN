const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Transaction extends Model {
  static associate(models) {
    Transaction.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    Transaction.belongsTo(models.Item, {
      foreignKey: "itemId",
      as: "item",
    });
  }
}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
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
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "COMPLETED", "CANCELLED"),
      defaultValue: "PENDING",
    },
    paymentStatus: {
      type: DataTypes.ENUM("PAID", "UNPAID", "REFUNDED"),
      defaultValue: "UNPAID",
    },
  },
  {
    sequelize,
    modelName: "Transaction",
    tableName: "transactions",
    timestamps: true,
  }
);

module.exports = Transaction;
