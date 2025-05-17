const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/mysql');

class UserFrameItem extends Model {
    static associate(models) {
        UserFrameItem.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });
        UserFrameItem.belongsTo(models.Frame, {
            foreignKey: 'frame_id',
            as: 'frame',
        });
    }
}

UserFrameItem.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        frame_id: { type: DataTypes.INTEGER, allowNull: false },
        completed_count: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
        status: { type: DataTypes.ENUM('seed', 'sprout', 'flower'), defaultValue: 'seed', allowNull: false },
        last_updated: { type: DataTypes.DATE, allowNull: true },
    },
    {
        sequelize,
        modelName: 'UserFrameItem',
        tableName: 'user_frame_items',
        timestamps: false,
    },
);

module.exports = UserFrameItem;
