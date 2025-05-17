const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/mysql');

class Frame extends Model {
    static associate(models) {
        Frame.hasMany(models.FrameVocabulary, {
            foreignKey: 'frame_id',
            as: 'frameVocabularies',
        });
        Frame.hasMany(models.UserFrameItem, {
            foreignKey: 'frame_id',
            as: 'userFrameItems',
        });
    }
}

Frame.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        frame_number: { type: DataTypes.INTEGER, allowNull: false },
        title: { type: DataTypes.STRING(100), allowNull: false },
        content: { type: DataTypes.TEXT, allowNull: true },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
    },
    {
        sequelize,
        modelName: 'Frame',
        tableName: 'frames',
        timestamps: false,
    },
);

module.exports = Frame;
