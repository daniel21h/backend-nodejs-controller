import { Request, Response } from 'express';

import CreateWasherService from '@modules/washers/services/CreateWasherService';

import { container } from 'tsyringe';

export default class WashersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      cpf,
      email,
      phone,
      machine_size,
      address_street,
      address_number,
      cep,
      ironing,
    } = request.body;

    const createWasher = container.resolve(CreateWasherService);

    const washer = await createWasher.execute({
      name,
      cpf,
      email,
      phone,
      machine_size,
      address_street,
      address_number,
      cep,
      ironing,
    });

    return response.json(washer);
  }
}
