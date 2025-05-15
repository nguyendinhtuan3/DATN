const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Course extends Model {
  static associate(models) {
    Course.hasMany(models.Lesson, { foreignKey: "courseId" });

    Course.belongsToMany(models.User, {
      through: "CourseUser",
      foreignKey: "courseId",
      otherKey: "userId",
    });

    Course.hasMany(models.Garden, {
      foreignKey: "courseId",
      as: "gardens",
    });

    Course.belongsToMany(models.MiniGame, {
      through: models.MiniGameCourse,
      foreignKey: "courseId",
      otherKey: "miniGameId",
    });
  }
}

Course.init(
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
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "Course",
    tableName: "courses",
    timestamps: false,
  }
);

module.exports = Course;
