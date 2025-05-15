const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class UserBadge extends Model {
  static associate(models) {
    UserBadge.belongsTo(models.User, { foreignKey: "userId" });
    UserBadge.belongsTo(models.Badge, { foreignKey: "badgeId" });
  }
}

UserBadge.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    badgeId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    awardedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    note: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "UserBadge",
    tableName: "user_badges",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["userId", "badgeId"],
      },
    ],
  }
);

module.exports = UserBadge;
