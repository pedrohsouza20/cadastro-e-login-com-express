const Sequelize = require("sequelize");
const connection = require("../../database/database");
const Account = connection.define("accounts", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  token: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

Account.sync().then(() => console.log("Sync complete"));

module.exports = Account;
