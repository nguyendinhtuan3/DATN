const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class MockTest extends Model {
  static associate(models) {
    MockTest.belongsTo(models.Course, {
      foreignKey: "courseId", // Khóa ngoại đến bảng Course
      allowNull: true, // Có thể không có khóa ngoại
    });
  }
}

MockTest.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "MockTest",
    tableName: "mock_tests",
    timestamps: false,
  }
);

module.exports = MockTest;
