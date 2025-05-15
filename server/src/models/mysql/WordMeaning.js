const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");
const Vocabulary = require("./Vocabulary");

class WordMeaning extends Model {}

WordMeaning.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    meaning: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vocabularyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Vocabulary,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "WordMeaning",
    tableName: "word_meanings",
    timestamps: false,
  }
);

// Định nghĩa mối quan hệ giữa Vocabulary và WordMeaning
WordMeaning.associate = (models) => {
  WordMeaning.belongsTo(models.Vocabulary, {
    foreignKey: "vocabularyId",
  });
};

module.exports = WordMeaning;
