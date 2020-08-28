"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IItemsRepository = _interopRequireDefault(require("../../items/repositories/IItemsRepository"));

var _IUsersRepository = _interopRequireDefault(require("../../users/repositories/IUsersRepository"));

var _IOrdersRepository = _interopRequireDefault(require("../repositories/IOrdersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('OrdersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ItemsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IOrdersRepository.default === "undefined" ? Object : _IOrdersRepository.default, typeof _IItemsRepository.default === "undefined" ? Object : _IItemsRepository.default, typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateOrderService {
  constructor(ordersRepository, itemsRepository, usersRepository) {
    this.ordersRepository = ordersRepository;
    this.itemsRepository = itemsRepository;
    this.usersRepository = usersRepository;
  }

  async execute({
    user_id,
    items
  }) {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new _AppError.default('Could not find any user with the given id');
    }

    const existentItems = await this.itemsRepository.findAllById(items);

    if (!existentItems.length) {
      throw new _AppError.default('Could no find any products with the given ids');
    }

    const existentItemsIds = existentItems.map(item => item.id);
    const checkInexistentItems = items.filter(item => !existentItemsIds.includes(item.id));

    if (checkInexistentItems.length) {
      throw new _AppError.default(`Could not find item ${checkInexistentItems[0].id}`);
    }

    const serializedItems = items.map(item => ({
      item_id: item.id,
      quantity: item.quantity,
      weight: item.weight,
      price: existentItems.filter(p => p.id === item.id)[0].price
    }));
    const order = await this.ordersRepository.create({
      user: userExists,
      items: serializedItems
    });
    return order;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateOrderService;
exports.default = _default;