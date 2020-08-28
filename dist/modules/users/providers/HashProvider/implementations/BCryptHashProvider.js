"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

class BCryptHashProvider {
  async generateHash(payload) {
    return (0, _bcryptjs.hash)(payload, 8);
  }

  async compareHash(payload, hashed) {
    // Compara uma senha não criptografada com uma já criptografada, para saber se é a mesma senha
    return (0, _bcryptjs.compare)(payload, hashed);
  }

}

var _default = BCryptHashProvider;
exports.default = _default;