import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListUserAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  // List all service providers except the user who is listing
  public async execute({ user_id }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllFromProvider({
      user_id,
    });

    return appointments;
  }
}

export default ListUserAppointmentsService;
