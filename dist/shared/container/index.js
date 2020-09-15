"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
require("@modules/users/providers");
require("./providers");
// Repo que será injetado no constructor quando for necessário uma var de seu mesmo tipo
var AppointmentsRepository_1 = __importDefault(require("@modules/appointments/infra/typeorm/repositories/AppointmentsRepository"));
var UsersRepository_1 = __importDefault(require("@modules/users/infra/typeorm/repositories/UsersRepository"));
var UserTokensRepository_1 = __importDefault(require("@modules/users/infra/typeorm/repositories/UserTokensRepository"));
var NotificationsRepository_1 = __importDefault(require("@modules/notifications/infra/typeorm/repositories/NotificationsRepository"));
var ItemsRepository_1 = __importDefault(require("@modules/items/infra/typeorm/repositories/ItemsRepository"));
var OrdersRepository_1 = __importDefault(require("@modules/orders/infra/typeorm/repositories/OrdersRepository"));
var WashersRepository_1 = __importDefault(require("@modules/washers/infra/typeorm/repositories/WashersRepository"));
var SaveCepRepository_1 = __importDefault(require("@modules/washers/infra/typeorm/repositories/SaveCepRepository"));
tsyringe_1.container.registerSingleton('AppointmentsRepository', AppointmentsRepository_1.default);
tsyringe_1.container.registerSingleton('UsersRepository', UsersRepository_1.default);
tsyringe_1.container.registerSingleton('UserTokensRepository', UserTokensRepository_1.default);
tsyringe_1.container.registerSingleton('NotificationsRepository', NotificationsRepository_1.default);
tsyringe_1.container.registerSingleton('ItemsRepository', ItemsRepository_1.default);
tsyringe_1.container.registerSingleton('OrdersRepository', OrdersRepository_1.default);
tsyringe_1.container.registerSingleton('WashersRepository', WashersRepository_1.default);
tsyringe_1.container.registerSingleton('SaveCepRepository', SaveCepRepository_1.default);
