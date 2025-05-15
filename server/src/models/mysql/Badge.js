const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Badge extends Model {
  static associate(models) {
    Badge.belongsToMany(models.User, {
      through: "UserBadges",
      foreignKey: "badgeId",
      otherKey: "userId",
    });
  }
}
Badge.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    imageUrl: {
      type: DataTypes.STRING(255),
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Badge",
    tableName: "badges",
    timestamps: true,
  }
);

module.exports = Badge;
