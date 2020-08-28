"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _appointments = _interopRequireDefault(require("../../../../modules/appointments/infra/http/routes/appointments.routes"));

var _providers = _interopRequireDefault(require("../../../../modules/appointments/infra/http/routes/providers.routes"));

var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));

var _sessions = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/sessions.routes"));

var _password = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/password.routes"));

var _items = _interopRequireDefault(require("../../../../modules/items/infra/http/routes/items.routes"));

var _orders = _interopRequireDefault(require("../../../../modules/orders/infra/http/routes/orders.routes"));

var _washers = _interopRequireDefault(require("../../../../modules/washers/infra/http/routes/washers.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/appointments', _appointments.default);
routes.use('/providers', _providers.default);
routes.use('/users', _users.default);
routes.use('/sessions', _sessions.default);
routes.use('/password', _password.default);
routes.use('/items', _items.default);
routes.use('/orders', _orders.default);
routes.use('/washers', _washers.default);
var _default = routes;
exports.default = _default;