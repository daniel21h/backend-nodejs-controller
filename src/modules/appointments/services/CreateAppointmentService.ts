import ptBR, { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IItemsRepository from '@modules/items/repositories/IItemsRepository';
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
  delivery_date: Date;
  items: IItem[];
}

interface IItem {
  id: string;
  weight: number;
  quantity: number;
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

    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute({
    date,
    delivery_date,
    provider_id,
    user_id,
    items,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const appointmentDeliveryDate = startOfHour(delivery_date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    if (isBefore(appointmentDeliveryDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    if (
      isBefore(
        appointmentDate,
        new Date().setHours(new Date(Date.now()).getHours() + 12),
      )
    ) {
      throw new AppError(
        'You can only create an appointment after 12 from the current time.',
      );
    }

    if (
      isBefore(
        appointmentDeliveryDate,
        new Date(appointmentDate).setHours(
          new Date(Date.now()).getHours() + 48,
        ),
      )
    ) {
      throw new AppError(
        'You can only create an appointment to delivery after 48 from the withdrawal time.',
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

    const existentItems = await this.itemsRepository.findAllById(items);

    if (!existentItems.length) {
      throw new AppError('Could no find any products with the given ids');
    }

    const existentItemsIds = existentItems.map(item => item.id);

    const checkInexistentItems = items.filter(
      item => !existentItemsIds.includes(item.id),
    );

    if (checkInexistentItems.length) {
      throw new AppError(`Could not find item ${checkInexistentItems[0].id}`);
    }

    const serializedItems = items.map(item => ({
      item_id: item.id,
      quantity: item.quantity,
      weight: item.weight,
      price: existentItems.filter(p => p.id === item.id)[0].price,
    }));

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
      delivery_date,
      items: serializedItems,
    });

    // const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'", {
    //   locale: ptBR,
    // });

    const deliveryDateFormatted = format(
      appointmentDate,
      "dd/MM/yyyy 'às' HH:mm'h'",
      {
        locale: ptBR,
      },
    );

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${deliveryDateFormatted}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDeliveryDate,
        'yyyy-M-d',
      )}`,
    );

    return appointment;
  }
}

export default CreateAppointmentService;
