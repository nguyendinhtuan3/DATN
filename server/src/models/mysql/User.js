const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class User extends Model {
  static associate(models) {
    User.belongsToMany(models.Badge, {
      through: "UserBadges",
      foreignKey: "userId",
      otherKey: "badgeId",
    });
    User.belongsTo(models.Role, { foreignKey: "roleId" });
    User.hasMany(models.Notification, { foreignKey: "userId" });
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
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("admin", "teacher", "student"),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "blocked", "banned"),
      allowNull: false,
      defaultValue: "active",
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    // Các thuộc tính bổ sung
    exp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    coin: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;
