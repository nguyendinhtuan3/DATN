const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Notification extends Model {
  static associate(models) {
    Notification.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}

Notification.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("system", "reward", "levelup", "course", "payment"),
      allowNull: false,
      defaultValue: "system",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Notification",
    tableName: "notifications",
    timestamps: true,
  }
);

module.exports = Notification;
