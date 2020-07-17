import ptBR, { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

/**
 * [x] Recebimento das informações
 * [x] Tratativa de erros/excessões
 * [x] Acesso ao repositório
 */

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

/**
 * Aplicando princípios
 * Dependency Inversion (SOLID)
 */

@injectable()
class CreateAppointmentService {
  // Arquivo que precisar utilizar o service(que são as rotas),
  // informe pra ele qual é o repositório
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    if (
      isBefore(
        appointmentDate,
        new Date().setHours(new Date(Date.now()).getHours() + 48),
      )
    ) {
      throw new AppError(
        'You can only create an appointment after 48 from the current time.',
      );
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself.");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 20) {
      throw new AppError(
        'You can only create appointments between 8am and 8pm.',
      );
    }

    // if (getHours(appointmentDate) < getHours(appointmentDate) + 12) {
    //   throw new AppError(
    //     'You can only create an appointment after 12 from the current time.',
    //   );
    // } //Code is errored

    // const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
    //   appointmentDate,
    //   provider_id,
    // );

    // if (findAppointmentInSameDate) {
    //   throw new AppError('This appointment is already booked');
    // }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'", {
      locale: ptBR,
    });

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento com para dia ${dateFormatted}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d',
      )}`,
    );

    return appointment;
  }
}

export default CreateAppointmentService;
