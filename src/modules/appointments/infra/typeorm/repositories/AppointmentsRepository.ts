import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import IFindAllFromProviderDTO from '@modules/appointments/dtos/IFindAllFromProviderDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    // Encontrar agendamento na mesma data retornando true or false,
    // para não haver agendamentos no mesmo horário
    const findAppointment = await this.ormRepository.findOne({
      // Como se estivesse fazendo um query no DB
      where: { date, provider_id },
    });

    return findAppointment;
  }

  public async findById(id: string): Promise<Appointment | undefined> {
    const order = this.ormRepository.findOne(id, {
      relations: ['order_items', 'user'],
    });

    return order;
  }

  public async findAllFromProvider({
    user_id,
  }: IFindAllFromProviderDTO): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find({
      where: {
        user_id,
      },
      relations: ['order_items', 'user'],
    });

    return appointments;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      relations: ['user'],
    });

    return appointments;
  }

  // Cria usuário e salva no DB
  public async create({
    provider_id,
    user_id,
    date,
    delivery_date,
    items,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date,
      delivery_date,
      order_items: items,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}
export default AppointmentsRepository;
