import { container } from 'tsyringe';

import '@modules/users/providers';

// Garante que a variável passada em segundo parametro, tem exatamente este formato abaixo
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
// Repo que será injetado no constructor quando for necessário uma var de seu mesmo tipo
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

// Garante que a variável passada em segundo parametro, tem exatamente este formato abaixo
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// Repo que será injetado no constructor quando for necessário uma var de seu mesmo tipo
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
