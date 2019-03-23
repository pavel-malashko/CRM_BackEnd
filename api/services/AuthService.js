const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const config = sails.config.auth;
const generator = require('generate-password');

module.exports = {

  generateSalt: (length = 16) => {
    return generator.generate({
      length: length,
      numbers: true,
      symbols: true,
      strict: true,
    })
  },

  generatePassword: (length = 8) => {
    return generator.generate({
      length: length,
      numbers: true,
      symbols: false,
      strict: true,
    })
  },

  encryptPassword: (password) => {
    return bcrypt.hashSync(password, saltRounds);
  },

  comparePasswords: (plainPassword, hash) => {
    return bcrypt.compareSync(plainPassword, hash);
  },

  generateToken: (id, secret) => {
    return jwt.sign({
      id: id,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
    }, config.jwtSecret + secret);
  },

  checkToken: (token, secret) => {
    try {
      let decoded = jwt.verify (
        token.replace('Bearer ', ''),
        config.jwtSecret + secret
      );
      return decoded.id;
    } catch (err) {
      return false;
    }
  },

};
