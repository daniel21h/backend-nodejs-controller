import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    // Retrieve user logged in to appointment
    const user_id = request.user.id;
    const { provider_id, date, delivery_date } = request.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date,
      delivery_date,
      provider_id,
      user_id,
    });

    // Retornando a resposta ao usuário
    return response.json(appointment);
  }
}
