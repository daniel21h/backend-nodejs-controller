import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUserAppointmentsService from '@modules/appointments/services/ListUserAppointmentsService';

export default class UserAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    // Retrieve user logged in to appointment
    const user_id = request.user.id;

    const listUserAppointments = container.resolve(ListUserAppointmentsService);

    const appointments = await listUserAppointments.execute({
      user_id,
    });

    // Retornando a resposta ao usuário
    return response.json(appointments);
  }
}
