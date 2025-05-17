const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/mysql');

class User extends Model {
    static associate(models) {
        User.belongsToMany(models.Badge, {
            through: 'UserBadges',
            foreignKey: 'userId',
            otherKey: 'badgeId',
        });

        User.belongsTo(models.Role, { foreignKey: 'roleId' });

        User.hasMany(models.Notification, { foreignKey: 'userId' });

        // Quan hệ 1-n: User tạo nhiều Course
        User.hasMany(models.Course, {
            foreignKey: 'creatorId',
            as: 'createdCourses',
        });
    }
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        role: {
            type: DataTypes.ENUM('admin', 'teacher', 'student'),
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        emailVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
    },
);

module.exports = User;
