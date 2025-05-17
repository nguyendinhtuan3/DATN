const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/mysql');

class FrameVocabulary extends Model {
    static associate(models) {
        FrameVocabulary.belongsTo(models.Frame, {
            foreignKey: 'frame_id',
            as: 'frame',
        });
        FrameVocabulary.belongsTo(models.Vocabulary, {
            foreignKey: 'vocab_id',
            as: 'vocabulary',
        });
    }
}

FrameVocabulary.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        frame_id: { type: DataTypes.INTEGER, allowNull: false },
        vocab_id: { type: DataTypes.INTEGER, allowNull: false },
        position: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        sequelize,
        modelName: 'FrameVocabulary',
        tableName: 'frame_vocabulary',
        timestamps: false,
    },
);

module.exports = FrameVocabulary;
