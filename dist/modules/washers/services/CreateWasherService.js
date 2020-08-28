"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IWashersRepository = _interopRequireDefault(require("../repositories/IWashersRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateWasherService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('WashersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IWashersRepository.default === "undefined" ? Object : _IWashersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateWasherService {
  constructor(washersRepository) {
    this.washersRepository = washersRepository;
  }

  async execute({
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
    const washerExists = await this.washersRepository.findByEmail(email);

    if (washerExists) {
      throw new _AppError.default('This e-mail is already assigned to a washer');
    }

    const washer = await this.washersRepository.create({
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
    return washer;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreateWasherService;
exports.default = _default;