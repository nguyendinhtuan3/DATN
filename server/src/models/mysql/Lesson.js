const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/mysql');

class Lesson extends Model {
    static associate(models) {
        // Lesson thuộc về một Course
        Lesson.belongsTo(models.Course, {
            foreignKey: 'courseId',
            as: 'course',
        });
    }
}

Lesson.init(
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
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        courseId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Lesson',
        tableName: 'lessons',
        timestamps: true, // sử dụng createdAt và updatedAt
    },
);

module.exports = Lesson;
