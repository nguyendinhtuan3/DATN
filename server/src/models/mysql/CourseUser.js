const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class CourseUser extends Model {}

CourseUser.init(
  {
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "courses",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "CourseUser",
    tableName: "course_users",
    timestamps: true,
  }
);

module.exports = CourseUser;
