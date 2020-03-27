const crypto = require ('crypto');

module.exports = function generateUniqueId() {
      //gera um numero com quatro bytes e converte para hexadecimal
      return  crypto.randomBytes(4).toString('HEX');
}