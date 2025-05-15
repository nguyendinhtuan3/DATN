const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Reward extends Model {
  static associate(models) {
    Reward.belongsTo(models.Image, { foreignKey: "imageId" });
    Reward.hasMany(models.UserReward, { foreignKey: "rewardId" });
  }
}
Reward.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "LOCKED", "DELETED"),
      defaultValue: "ACTIVE",
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Reward",
    tableName: "rewards",
    timestamps: true,
  }
);

module.exports = Reward;
