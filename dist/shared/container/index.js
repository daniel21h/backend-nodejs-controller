"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers");

require("./providers");

var _AppointmentsRepository = _interopRequireDefault(require("../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository"));

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

var _UserTokensRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserTokensRepository"));

var _NotificationsRepository = _interopRequireDefault(require("../../modules/notifications/infra/typeorm/repositories/NotificationsRepository"));

var _ItemsRepository = _interopRequireDefault(require("../../modules/items/infra/typeorm/repositories/ItemsRepository"));

var _OrdersRepository = _interopRequireDefault(require("../../modules/orders/infra/typeorm/repositories/OrdersRepository"));

var _WashersRepository = _interopRequireDefault(require("../../modules/washers/infra/typeorm/repositories/WashersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Repo que será injetado no constructor quando for necessário uma var de seu mesmo tipo
_tsyringe.container.registerSingleton('AppointmentsRepository', _AppointmentsRepository.default);

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);

_tsyringe.container.registerSingleton('UserTokensRepository', _UserTokensRepository.default);

_tsyringe.container.registerSingleton('NotificationsRepository', _NotificationsRepository.default);

_tsyringe.container.registerSingleton('ItemsRepository', _ItemsRepository.default);

_tsyringe.container.registerSingleton('OrdersRepository', _OrdersRepository.default);

_tsyringe.container.registerSingleton('WashersRepository', _WashersRepository.default);