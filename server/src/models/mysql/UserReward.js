const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class UserReward extends Model {
  static associate(models) {
    UserReward.belongsTo(models.User, { foreignKey: "userId" });
    UserReward.belongsTo(models.Reward, { foreignKey: "rewardId" });
  }
}

UserReward.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    rewardId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "LOCKED", "DELETED", "EXPIRED"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "UserReward",
    tableName: "user_rewards",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "rewardId"],
      },
    ],
  }
);

module.exports = UserReward;
