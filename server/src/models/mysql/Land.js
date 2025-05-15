const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Land extends Model {
  static associate(models) {
    Land.belongsTo(models.Image, {
      foreignKey: "imageId",
      as: "image",
    });
    Land.belongsTo(models.Image, {
      foreignKey: "statusImageId",
      as: "statusImage",
    });
    Land.belongsTo(models.Garden, {
      foreignKey: "gardenId",
      as: "garden",
    });
  }
}

Land.init(
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
    imageId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "images",
        key: "id",
      },
    },
    statusImageId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "images",
        key: "id",
      },
    },
    gardenId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "gardens",
        key: "id",
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("FERTILE", "BARE", "DEPLETED"),
      defaultValue: "FERTILE",
    },
    fertility: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    vocabularyCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    quality: {
      type: DataTypes.ENUM("BAD", "NORMAL", "GOOD", "EXCELLENT"),
      defaultValue: "NORMAL",
      allowNull: false,
    },
    expBonus: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lastPlantedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Land",
    tableName: "lands",
    timestamps: true,
  }
);

module.exports = Land;
