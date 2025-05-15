const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Role extends Model {
  static associate(models) {
    Role.hasMany(models.User, { foreignKey: "roleId" });
  }
}

Role.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.ENUM("admin", "teacher", "student"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "roles",
    timestamps: false,
  }
);

module.exports = Role;
