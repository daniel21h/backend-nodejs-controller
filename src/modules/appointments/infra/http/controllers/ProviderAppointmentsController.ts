import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    // Retrieve user logged in to appointment
    const provider_id = request.user.id;
    const { day, month, year } = request.query;

    const ListProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await ListProviderAppointments.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    // Retornando a resposta ao usuário
    return response.json(appointments);
  }
}
