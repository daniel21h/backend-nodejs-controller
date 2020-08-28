"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateOrderService = _interopRequireDefault(require("../../../services/CreateOrderService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OrdersController {
  async show(request, response) {// TODO
  }

  async create(request, response) {
    // Retrieve user logged in to appointment
    // const user_id = request.user.id;
    const {
      user_id,
      items
    } = request.body;

    const createOrder = _tsyringe.container.resolve(_CreateOrderService.default);

    const user = await createOrder.execute({
      user_id,
      items
    });
    return response.json(user);
  }

}

exports.default = OrdersController;