"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = _interopRequireWildcard(require("date-fns"));

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _INotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/INotificationsRepository"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IItemsRepository = _interopRequireDefault(require("../../items/repositories/IItemsRepository"));

var _IAppointmentsRepository = _interopRequireDefault(require("../repositories/IAppointmentsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Aplicando princípios
 * Dependency Inversion (SOLID)
 */
let CreateAppointmentService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('NotificationsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('ItemsRepository')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default, typeof _INotificationsRepository.default === "undefined" ? Object : _INotificationsRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default, typeof _IItemsRepository.default === "undefined" ? Object : _IItemsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class CreateAppointmentService {
  // Arquivo que precisar utilizar o service(que são as rotas),
  // informe pra ele qual é o repositório
  constructor(appointmentsRepository, notificationsRepository, cacheProvider, itemsRepository) {
    this.appointmentsRepository = appointmentsRepository;
    this.notificationsRepository = notificationsRepository;
    this.cacheProvider = cacheProvider;
    this.itemsRepository = itemsRepository;
  }

  async execute({
    date,
    delivery_date,
    provider_id,
    user_id,
    items
  }) {
    const appointmentDate = (0, _dateFns.startOfHour)(date);
    const appointmentDeliveryDate = (0, _dateFns.startOfHour)(delivery_date);

    if ((0, _dateFns.isBefore)(appointmentDate, Date.now())) {
      throw new _AppError.default("You can't create an appointment on a past date.");
    }

    if ((0, _dateFns.isBefore)(appointmentDeliveryDate, Date.now())) {
      throw new _AppError.default("You can't create an appointment on a past date.");
    }

    if ((0, _dateFns.isBefore)(appointmentDate, new Date().setHours(new Date(Date.now()).getHours() + 12))) {
      throw new _AppError.default('You can only create an appointment after 12 from the current time.');
    }

    if ((0, _dateFns.isBefore)(appointmentDeliveryDate, new Date(appointmentDate).setHours(new Date(Date.now()).getHours() + 48))) {
      throw new _AppError.default('You can only create an appointment to delivery after 48 from the withdrawal time.');
    }

    if (user_id === provider_id) {
      throw new _AppError.default("You can't create an appointment with yourself.");
    }

    if ((0, _dateFns.getHours)(appointmentDate) < 8 || (0, _dateFns.getHours)(appointmentDate) > 20) {
      throw new _AppError.default('You can only create appointments between 8am and 8pm.');
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
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
      delivery_date,
      items: serializedItems
    }); // const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'", {
    //   locale: ptBR,
    // });

    const deliveryDateFormatted = (0, _dateFns.format)(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'", {
      locale: _dateFns.default
    });
    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${deliveryDateFormatted}`
    });
    await this.cacheProvider.invalidate(`provider-appointments:${provider_id}:${(0, _dateFns.format)(appointmentDeliveryDate, 'yyyy-M-d')}`);
    return appointment;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateAppointmentService;
exports.default = _default;