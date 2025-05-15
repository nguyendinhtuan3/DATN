// src/models/mysql/Question.js
const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Question extends Model {
  static associate(models) {
    Question.hasMany(models.Answer, { foreignKey: "questionId" });
    Question.belongsTo(models.Lesson, { foreignKey: "lessonId" });
  }
}

Question.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lessonId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "lessons",
        key: "id",
      },
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    options: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timeLimit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "LOCKED", "DELETED"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Question",
    tableName: "questions",
    timestamps: true,
  }
);

module.exports = Question;
