const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/mysql');

class Lesson extends Model {
    static associate(models) {
        Lesson.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });
        Lesson.belongsTo(models.MasteryRoad, {
            foreignKey: 'masteryRoadId',
            as: 'masteryRoad',
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
        course_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'courses',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        modelName: 'Lesson',
        tableName: 'lessons',
        timestamps: true,
    },
);
module.exports = Lesson;
