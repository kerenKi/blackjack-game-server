const Sequelize = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define(
  "users",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: "users"
  }
);

module.exports = User;
