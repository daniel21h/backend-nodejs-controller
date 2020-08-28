"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _OrdersController = _interopRequireDefault(require("../controller/OrdersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ordersRouter = (0, _express.Router)();
const ordersController = new _OrdersController.default();
ordersRouter.post('/', ordersController.create);
ordersRouter.get('/:id', ordersController.show);
var _default = ordersRouter;
exports.default = _default;