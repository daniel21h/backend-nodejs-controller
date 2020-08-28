"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Order = _interopRequireDefault(require("../entities/Order"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OrdersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Order.default);
  }

  async create({
    user,
    items
  }) {
    const order = this.ormRepository.create({
      user,
      order_items: items
    });
    await this.ormRepository.save(order);
    return order;
  }

  async findById(id) {
    const order = this.ormRepository.findOne(id, {
      relations: ['order_items', 'user']
    });
    return order;
  }

}

var _default = OrdersRepository;
exports.default = _default;