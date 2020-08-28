"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateWasherService = _interopRequireDefault(require("../../../services/CreateWasherService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WashersController {
  async create(request, response) {
    const {
      name,
      cpf,
      email,
      phone,
      machine_size,
      address_street,
      address_number,
      cep,
      ironing
    } = request.body;

    const createWasher = _tsyringe.container.resolve(_CreateWasherService.default);

    const washer = await createWasher.execute({
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
    return response.json(washer);
  }

}

exports.default = WashersController;