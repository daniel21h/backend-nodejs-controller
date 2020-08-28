"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeHashProvider {
  async generateHash(payload) {
    return payload;
  }

  async compareHash(payload, hashed) {
    // Compara uma senha não criptografada com uma já criptografada, para saber se é a mesma senha
    return payload === hashed;
  }

}

var _default = FakeHashProvider;
exports.default = _default;