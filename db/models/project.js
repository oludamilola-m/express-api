"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // define association here
    static associate(models) {
      Project.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: "userId",
      });
    }
  }
  Project.init(
    {
      title: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      description: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
