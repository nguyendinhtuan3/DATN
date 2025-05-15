const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class MiniGameCourse extends Model {}

MiniGameCourse.init(
  {
    miniGameId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "mini_games",
        key: "id",
      },
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "courses",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "MiniGameCourse",
    tableName: "mini_game_courses",
    timestamps: false,
  }
);

module.exports = MiniGameCourse;
