const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class MasteryRoad extends Model {
  static associate(models) {
    MasteryRoad.belongsTo(models.Course, {
      foreignKey: "courseId",
      as: "course",
    });
    MasteryRoad.belongsTo(models.Tower, {
      foreignKey: "towerId",
      as: "tower",
    });
    MasteryRoad.belongsTo(models.Garden, {
      foreignKey: "gardenId",
      as: "garden",
    });
    MasteryRoad.belongsTo(models.Progress, {
      foreignKey: "progressId",
      as: "progress",
    });
    MasteryRoad.hasMany(models.Lesson, {
      foreignKey: "masteryRoadId",
      as: "lessons",
    });
  }
}

MasteryRoad.init(
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
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "courses",
        key: "id",
      },
    },
    towerId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "towers",
        key: "id",
      },
    },
    gardenId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "gardens",
        key: "id",
      },
    },
    progressId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "progresses",
        key: "id",
      },
    },
    difficultyLevel: {
      type: DataTypes.ENUM("beginner", "intermediate", "advanced"),
      allowNull: false,
      defaultValue: "beginner",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
    targetScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isPersonalized: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    totalXP: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "MasteryRoad",
    tableName: "mastery_roads",
    timestamps: true,
    underscored: true,
  }
);

module.exports = MasteryRoad;
