const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class TestResult extends Model {
  static associate(models) {
    // Mối quan hệ với bảng User
    TestResult.belongsTo(models.User, {
      foreignKey: "userId",
      allowNull: false,
    });

    // Mối quan hệ với bảng MiniTest
    TestResult.belongsTo(models.MiniTest, {
      foreignKey: "miniTestId",
      allowNull: false,
    });
  }
}

TestResult.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    miniTestId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    passed: {
      type: DataTypes.BOOLEAN, // Trạng thái vượt qua bài kiểm tra hay không
      defaultValue: false,
    },
    completedAt: {
      type: DataTypes.DATE, // Thời gian hoàn thành bài kiểm tra
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "TestResult",
    tableName: "test_results",
    timestamps: true,
  }
);

module.exports = TestResult;
