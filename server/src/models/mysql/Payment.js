const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Payment extends Model {
  static associate(models) {
    Payment.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  }
}

Payment.init(
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
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    coin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("TOP_UP", "BUY_COURSE"),
      allowNull: false,
    },
    refId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "SUCCESS",
        "FAILED",
        "REFUNDED",
        "CANCELLED"
      ),
      defaultValue: "PENDING",
    },
    method: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "payments",
    timestamps: true,
  }
);

module.exports = Payment;
