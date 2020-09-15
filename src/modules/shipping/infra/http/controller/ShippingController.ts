import { Request, Response } from 'express';
import PostOffices from 'node-correios';

import { container } from 'tsyringe';
import CreateShippingService from '@modules/shipping/services/CreateShippingService';

export default class ItemsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cep, price } = request.body;

    const createShipping = container.resolve(CreateShippingService);

    const postOffices = new PostOffices();

    Number(cep);

    const postResponse = await postOffices.consultaCEP({ cep });

    const shipping = await createShipping.execute({
      neighborhood: postResponse.bairro,
      location: postResponse.localidade,
      uf: postResponse.uf,
      price,
    });

    return response.json(shipping);
  }
}
