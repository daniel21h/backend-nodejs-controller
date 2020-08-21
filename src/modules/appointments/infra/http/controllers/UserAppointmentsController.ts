import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUserAppointmentsService from '@modules/appointments/services/ListUserAppointmentsService';
// import ListUserOrdersService from '@modules/appointments/services/ListUserOrdersService';

export default class UserAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    // Retrieve user logged in to appointment
    const user_id = request.user.id;
    // const { id } = request.params;

    const listUserAppointments = container.resolve(ListUserAppointmentsService);
    // const listUserOrders = container.resolve(ListUserOrdersService);

    const appointments = await listUserAppointments.execute({
      user_id,
    });

    // const order = await listUserOrders.execute({
    //   id,
    // });

    // Retornando a resposta ao usuário
    return response.json(appointments);
  }
}
