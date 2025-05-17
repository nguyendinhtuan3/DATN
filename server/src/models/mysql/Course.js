const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/mysql');

class Course extends Model {
    static associate(models) {
        Course.hasMany(models.Lesson, { foreignKey: 'courseId' });
        Course.belongsTo(models.CourseType, {
            foreignKey: 'courseTypeId',
            as: 'courseType',
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
        title: {
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
