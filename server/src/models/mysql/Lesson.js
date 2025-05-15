const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Lesson extends Model {
  static associate(models) {
    Lesson.belongsTo(models.Course, { foreignKey: "courseId", as: "course" });
    Lesson.belongsTo(models.MasteryRoad, {
      foreignKey: "masteryRoadId",
      as: "masteryRoad",
    });
  }
}

Lesson.init(
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
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "courses",
        key: "id",
      },
    },
    masteryRoadId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "mastery_roads",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Lesson",
    tableName: "lessons",
    timestamps: true,
  }
);
module.exports = Lesson;
