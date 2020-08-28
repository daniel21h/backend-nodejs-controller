"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Washer = _interopRequireDefault(require("../entities/Washer"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListWashersRepository = (_dec = (0, _typeorm.EntityRepository)(_Washer.default), _dec(_class = class ListWashersRepository extends _typeorm.Repository {
  async getOrder() {
    // Retornar o balanceKey
    const washers = await this.find();
    return washers;
  }

}) || _class);
exports.default = ListWashersRepository;