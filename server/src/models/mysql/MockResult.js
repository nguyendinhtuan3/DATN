const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class MockResult extends Model {
  static associate(models) {
    MockResult.belongsTo(models.User, {
      foreignKey: "userId",
      allowNull: false,
    });

    MockResult.belongsTo(models.Question, {
      foreignKey: "questionId",
      allowNull: false,
    });
    MockResult.belongsTo(models.MockTest, {
      foreignKey: "mockTestId",
    });
  }
}

MockResult.init(
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
    questionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    mockTestId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "MockResult",
    tableName: "mock_results",
    timestamps: true,
  }
);

module.exports = MockResult;
