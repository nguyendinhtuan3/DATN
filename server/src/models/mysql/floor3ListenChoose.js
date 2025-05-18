const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/mysql'); // Giả định kết nối tới toeic_floor3

class Floor3ListenChoose extends Model {}

Floor3ListenChoose.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        question: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        audio_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        options: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        correct_answer: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Floor3ListenChoose',
        tableName: 'floor3_listen_choose',
        timestamps: false, // Không cần timestamps vì bảng không có createdAt/updatedAt
    },
);

module.exports = Floor3ListenChoose;
