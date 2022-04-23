const express = require("express");
const encryptPassword = require("../../services/login/encrypt-password");
const router = express.Router();

const Account = require("./../AccountController/Account");

router.get("/api/login", (req, res) => {
  Account.findOne({
    where: {
      email: "contato.pedromoc@gmail.com",
    },
  })
    .then((account) => {
      res.send(account);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
