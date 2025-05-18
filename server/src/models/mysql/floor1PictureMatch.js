const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/mysql'); // Giả định kết nối tới toeic_floor1

class Floor1PictureMatch extends Model {}

Floor1PictureMatch.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: false,
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
        modelName: 'Floor1PictureMatch',
        tableName: 'floor1_picture_match',
        timestamps: false, // Không cần timestamps
    },
);

module.exports = Floor1PictureMatch;
