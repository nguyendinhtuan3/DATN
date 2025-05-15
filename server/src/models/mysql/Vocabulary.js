const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Vocabulary extends Model {
  // Phương thức để lấy ví dụ từ metadata
  getExamples() {
    return this.metadata?.examples || [];
  }

  // Phương thức để lấy từ đồng nghĩa từ metadata
  getSynonyms() {
    return this.metadata?.synonyms || [];
  }

  // Phương thức để lấy từ trái nghĩa từ metadata
  getAntonyms() {
    return this.metadata?.antonyms || [];
  }

  // Phương thức để lấy độ khó từ metadata
  getDifficultyLevel() {
    return this.metadata?.difficultyLevel || "basic";
  }

  // Phương thức để lấy chủ đề từ metadata
  getTopic() {
    return this.metadata?.topic || "";
  }
}

Vocabulary.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("noun", "verb", "adjective", "adverb"),
      allowNull: false,
    },
    phonetic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    audio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {
        examples: [],
        topic: "",
        synonyms: [],
        antonyms: [],
        difficultyLevel: "basic",
        image: "",
        relatedContent: [],
        source: "",
      },
    },
  },
  {
    sequelize,
    modelName: "Vocabulary",
    tableName: "vocabularies",
    timestamps: false,
  }
);

module.exports = Vocabulary;
