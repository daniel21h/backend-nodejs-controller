"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var ProvidersController_1 = __importDefault(require("../controllers/ProvidersController"));
var ProviderMonthAvailabilityController_1 = __importDefault(require("../controllers/ProviderMonthAvailabilityController"));
var ProviderDayAvailabilityController_1 = __importDefault(require("../controllers/ProviderDayAvailabilityController"));
var UserAppointmentsController_1 = __importDefault(require("../controllers/UserAppointmentsController"));
var providersRouter = express_1.Router();
var providersController = new ProvidersController_1.default();
var providerMonthAvailabilityController = new ProviderMonthAvailabilityController_1.default();
var providerDayAvailabilityController = new ProviderDayAvailabilityController_1.default();
var userAppointmentsController = new UserAppointmentsController_1.default();
providersRouter.use(ensureAuthenticated_1.default);
// Listing providers
providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        provider_id: celebrate_1.Joi.string().uuid().required(),
    },
    _a)), providerMonthAvailabilityController.index);
providersRouter.get('/:provider_id/day-availability', celebrate_1.celebrate((_b = {},
    _b[celebrate_1.Segments.PARAMS] = {
        provider_id: celebrate_1.Joi.string().uuid().required(),
    },
    _b)), providerDayAvailabilityController.index);
providersRouter.get('/:provider_id/me/user', celebrate_1.celebrate((_c = {},
    _c[celebrate_1.Segments.PARAMS] = {
        provider_id: celebrate_1.Joi.string().uuid().required(),
    },
    _c)), userAppointmentsController.index);
exports.default = providersRouter;
