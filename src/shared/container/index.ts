import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

// Garante que a variável passada em segundo parametro, tem exatamente este formato abaixo
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
// Repo que será injetado no constructor quando for necessário uma var de seu mesmo tipo
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import ItemsRepository from '@modules/items/infra/typeorm/repositories/ItemsRepository';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

import IWashersRepository from '@modules/washers/repositories/IWashersRepository';
import WashersRepository from '@modules/washers/infra/typeorm/repositories/WashersRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<IItemsRepository>(
  'ItemsRepository',
  ItemsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IWashersRepository>(
  'WashersRepository',
  WashersRepository,
);
