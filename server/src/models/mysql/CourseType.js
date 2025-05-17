const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/mysql');

class CourseType extends Model {
    static associate(models) {
        CourseType.hasMany(models.Course, {
            foreignKey: 'courseTypeId',
            as: 'courses',
        });
    }
}

CourseType.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'CourseType',
        tableName: 'course_types',
        timestamps: true,
    }
);

module.exports = CourseType;
