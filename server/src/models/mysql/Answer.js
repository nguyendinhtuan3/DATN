const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Answer extends Model {
  static associate(models) {
    Answer.belongsTo(models.Question, {
      foreignKey: "questionId",
      onDelete: "CASCADE",
    });
  }
}

Answer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    label: {
      type: DataTypes.ENUM("A", "B", "C", "D"),
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    questionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Answer",
    tableName: "answers",
    timestamps: false,
    underscored: true,
  }
);

module.exports = Answer;
