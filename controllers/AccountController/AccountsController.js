const express = require("express");
const router = express.Router();

const Account = require("./Account");

const crypto = require("crypto");

const encryptPassword = require("../../services/login/encrypt-password");
const { json } = require("express/lib/response");

router.get("/api/accounts", (req, res) => {
  Account.findAll()
    .then((accounts) => {
      if (accounts) {
        res.send(accounts);
      } else {
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/api/login/", (req, res) => {
  let email = "otaldobrabinho@gmail.com";
  Account.findOne({
    where: {
      email: email,
    },
  }).then((account) => {
    let receivedAccount = account;
    res.send(receivedAccount.password + " " + receivedAccount.salt);
  });
});

router.post("/api/account", (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let password = encryptPassword(req.body.password);
  Account.create({
    email: email,
    name: name,
    password: password,
  })
    .then(() => {
      res.json({
        status: 201,
        message: "success",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
