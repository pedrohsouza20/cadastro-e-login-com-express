const crypto = require("crypto");

const CRYPTO_SETS = {
  algorythim: "aes-256-cbc",
  secret: "youllneverfinditimsorrylittleboy",
  type: "hex",
  key: crypto.randomBytes(32),
  iv: crypto.randomBytes(16),
};

function encryptPassword(password) {
  const cipher = crypto.createCipheriv(
    CRYPTO_SETS.algorythim,
    Buffer.from(CRYPTO_SETS.key),
    CRYPTO_SETS.iv
  );
  cipher.update(password);
  return cipher.final(CRYPTO_SETS.type);
}

module.exports = encryptPassword;
