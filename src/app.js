const express = require("express");
const app = express();
const connection = require("./../database/database");

const accountsController = require("./../controllers/AccountController/AccountsController");
const loginController = require("./../controllers/LoginController/LoginController");

const Accounts = require("./../controllers/AccountController/Account");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const cors = require("cors");

const port = 4141;

connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com sucesso");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors());

app.use("/", accountsController);
app.use("/", loginController);

app.get("/first-rest-api-route", (req, res) => {
  res.json(namesList);
});

app.listen(port, () => {
  console.log("Conectado com sucesso");
});
