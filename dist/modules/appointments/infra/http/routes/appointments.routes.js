"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _AppointmentsController = _interopRequireDefault(require("../controllers/AppointmentsController"));

var _ProviderAppointmentsController = _interopRequireDefault(require("../controllers/ProviderAppointmentsController"));

var _UserAppointmentsController = _interopRequireDefault(require("../controllers/UserAppointmentsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appointmentsRouter = (0, _express.Router)();
const appointmentsController = new _AppointmentsController.default();
const providerAppointmentsController = new _ProviderAppointmentsController.default();
const userAppointmentsController = new _UserAppointmentsController.default();
appointmentsRouter.use(_ensureAuthenticated.default); // // Listando Agendamentos
// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });
// Criação de agendamento

appointmentsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    provider_id: _celebrate.Joi.string().uuid().required(),
    date: _celebrate.Joi.date(),
    delivery_date: _celebrate.Joi.date(),
    items: _celebrate.Joi.array()
  }
}), appointmentsController.create); // Listing appointments by provider

appointmentsRouter.get('/me', providerAppointmentsController.index);
appointmentsRouter.get('/me/user', userAppointmentsController.index);
var _default = appointmentsRouter;
exports.default = _default;