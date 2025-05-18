const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/mysql'); // Giả định kết nối tới toeic_floor2

class Floor2MazePopup extends Model {}

Floor2MazePopup.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        modelName: 'Floor2MazePopup',
        tableName: 'floor2_maze_popup',
        timestamps: false, // Không cần timestamps
    },
);

module.exports = Floor2MazePopup;
