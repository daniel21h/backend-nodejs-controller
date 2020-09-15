"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var AppointmentsController_1 = __importDefault(require("../controllers/AppointmentsController"));
var ProviderAppointmentsController_1 = __importDefault(require("../controllers/ProviderAppointmentsController"));
var UserAppointmentsController_1 = __importDefault(require("../controllers/UserAppointmentsController"));
var appointmentsRouter = express_1.Router();
var appointmentsController = new AppointmentsController_1.default();
var providerAppointmentsController = new ProviderAppointmentsController_1.default();
var userAppointmentsController = new UserAppointmentsController_1.default();
appointmentsRouter.use(ensureAuthenticated_1.default);
// // Listando Agendamentos
// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });
// Criação de agendamento
appointmentsRouter.post('/', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        provider_id: celebrate_1.Joi.string().uuid().required(),
        date: celebrate_1.Joi.date(),
        delivery_date: celebrate_1.Joi.date(),
        items: celebrate_1.Joi.array(),
    },
    _a)), appointmentsController.create);
// Listing appointments by provider
appointmentsRouter.get('/me', providerAppointmentsController.index);
appointmentsRouter.get('/me/user', userAppointmentsController.index);
exports.default = appointmentsRouter;
