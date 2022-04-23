const express = require("express");
const router = express.Router();

const Account = require("./Account");

const crypto = require("crypto");

const CRYPTO_SETS = {
  algorythim: "aes-256-cbc",
  secret: "youllneverfinditimsorrylittleboy",
  type: "hex",
  key: crypto.randomBytes(32),
  iv: crypto.randomBytes(16),
};

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

function encryptPassword(password) {
  const cipher = crypto.createCipheriv(
    CRYPTO_SETS.algorythim,
    Buffer.from(CRYPTO_SETS.key),
    CRYPTO_SETS.iv
  );
  cipher.update(password);
  return cipher.final(CRYPTO_SETS.type);
}

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

router.post("/api/accounts", (req, res) => {
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
