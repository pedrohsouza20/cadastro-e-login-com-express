const Sequelize = require("sequelize");

const connection = new Sequelize("todo-list", "root", "19372855", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
