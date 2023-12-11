"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TeamMember extends Model {
    static associate(models) {}
  }
  TeamMember.init(
    {
      name: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "TeamMember",
      paranoid: true,
    }
  );
  return TeamMember;
};
