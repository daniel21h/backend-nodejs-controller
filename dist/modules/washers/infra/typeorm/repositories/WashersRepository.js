"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Washer = _interopRequireDefault(require("../entities/Washer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WashersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Washer.default);
  }

  async create({
    name,
    cpf,
    email,
    phone,
    machine_size,
    address_street,
    address_number,
    cep,
    ironing
  }) {
    const washer = this.ormRepository.create({
      name,
      cpf,
      email,
      phone,
      machine_size,
      address_street,
      address_number,
      cep,
      ironing
    });
    await this.ormRepository.save(washer);
    return washer;
  }

  async findByEmail(email) {
    const findWasher = await this.ormRepository.findOne({
      where: {
        email
      }
    });
    return findWasher;
  }

}

var _default = WashersRepository;
exports.default = _default;