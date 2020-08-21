import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  id: string;
}

@injectable()
class ListUserAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  // List all service providers except the user who is listing
  public async execute({ id }: IRequest): Promise<Appointment | undefined> {
    const order = await this.appointmentsRepository.findById(id);

    return order;
  }
}

export default ListUserAppointmentsService;
