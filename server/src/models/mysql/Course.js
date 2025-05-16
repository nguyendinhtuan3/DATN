const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/mysql');

class Course extends Model {
    static associate(models) {
        Course.hasMany(models.Lesson, { foreignKey: 'courseId' });

        Course.belongsTo(models.CourseType, {
            foreignKey: 'courseTypeId',
            as: 'courseType',
        });

        Course.belongsToMany(models.User, {
            through: 'CourseUser',
            foreignKey: 'courseId',
            otherKey: 'userId',
        });

        Course.hasMany(models.Garden, {
            foreignKey: 'courseId',
            as: 'gardens',
        });

        Course.belongsToMany(models.MiniGame, {
            through: models.MiniGameCourse,
            foreignKey: 'courseId',
            otherKey: 'miniGameId',
        });

        // Quan hệ Course thuộc về 1 User tạo ra
        Course.belongsTo(models.User, {
            foreignKey: 'creatorId',
            as: 'creator',
        });
    }
}

Course.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        courseTypeId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.0,
        },
        link: {
            type: DataTypes.STRING(255), // link nên là STRING chứ không phải DECIMAL
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'active',
        },
        creatorId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Course',
        tableName: 'courses',
        timestamps: true,
    },
);

module.exports = Course;
