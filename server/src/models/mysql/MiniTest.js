const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class MiniTest extends Model {
  static associate(models) {
    // Mối quan hệ với bảng Tower
    MiniTest.belongsTo(models.Tower, {
      foreignKey: "towerId",
      allowNull: false,
    });
  }
}

MiniTest.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    timeLimit: {
      type: DataTypes.INTEGER, // Giới hạn thời gian làm bài
      allowNull: false,
    },
    towerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    passScore: {
      type: DataTypes.INTEGER, // Điểm yêu cầu để vượt qua bài kiểm tra
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "MiniTest",
    tableName: "mini_tests",
    timestamps: true,
  }
);

module.exports = MiniTest;
