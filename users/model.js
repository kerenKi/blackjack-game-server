// Import
const Sequelize = require("sequelize");
const sequelize = require("../db");

// Model
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

// Export
module.exports = User;
