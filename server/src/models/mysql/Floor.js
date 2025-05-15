const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Floor extends Model {
  static associate(models) {
    Floor.belongsTo(models.Tower, {
      foreignKey: "towerId",
      as: "tower",
    });

    Floor.belongsTo(models.MiniGame, {
      foreignKey: "miniGameId",
      as: "miniGame",
    });
  }
}

Floor.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 7,
      },
    },
    miniGameId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "mini_games",
        key: "id",
      },
    },
    toeicScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    towerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "towers",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Floor",
    tableName: "floors",
    timestamps: false,
  }
);

module.exports = Floor;
