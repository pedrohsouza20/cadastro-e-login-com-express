const express = require("express");
const router = express.Router();

const Account = require("./Account");

const crypto = require("crypto");

function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

function sha512(password, salt) {
  let hash = crypto.createHmac("sha512", salt); // Algoritmo de cripto sha512
  hash.update(password);
  hash = hash.digest("hex");
  return {
    salt,
    hash,
  };
}

function generatePassword(senha) {
  var salt = generateSalt(16); // Vamos gerar o salt
  var passwordAndSalt = sha512(senha, salt); // Pegamos a senha e o salt
  // A partir daqui você pode retornar a senha ou já salvar no banco o salt e a senha
  console.log("Senha Hash: " + passwordAndSalt.hash);
  console.log("Salt: " + passwordAndSalt.salt);
  return passwordAndSalt.hash, "teste", passwordAndSalt.salt;
}

generatePassword("123456");
generatePassword("ABC123");

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
  function getResponse(senhaLogin, saltBanco, hashBanco) {
    let passAndSalt = sha512(senhaLogin, saltBanco);
    console.log(
      `senha recebida: ${senhaLogin}, salt banco: ${saltBanco}, hash banco: ${hashBanco}, passAndSalt: ${passAndSalt.hash}`
    );
    return passAndSalt.hash === hashBanco;
  }
  let email = "otaldobrabinho@gmail.com";
  Account.findOne({
    where: {
      email: email,
    },
  }).then((account) => {
    let receivedAccount = account;
    res.send(
      receivedAccount.password +
        " " +
        receivedAccount.salt +
        " " +
        getResponse(
          "senha123senha123",
          receivedAccount.salt,
          receivedAccount.password
        )
    );
  });
});

router.post("/api/accounts", (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let password = req.body.password;
  let salt = generateSalt();
  let hashAndSalt = sha512(password, salt);
  Account.create({
    email: email,
    name: name,
    password: hashAndSalt.hash,
    salt: hashAndSalt.salt,
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
