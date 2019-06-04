// Connect
const Sequelize = require("sequelize");
const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";
const sequelize = new Sequelize(connectionString, {
  define: { timestamps: false }
});

// Sync
sequelize
  .sync()
  .then(() => {
    console.log("Sequelize updated database!");
  })
  .catch(console.error);

// Export
module.exports = sequelize;
