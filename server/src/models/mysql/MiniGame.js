const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class MiniGame extends Model {
  static associate(models) {
    MiniGame.belongsToMany(models.Course, {
      through: models.MiniGameCourse,
      foreignKey: "miniGameId",
      otherKey: "courseId",
    });
    MiniGame.hasMany(models.Floor, {
      foreignKey: "miniGameId",
      as: "floors",
    });
  }
}
MiniGame.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "MiniGame",
    tableName: "mini_games",
    timestamps: true,
  }
);

module.exports = MiniGame;
