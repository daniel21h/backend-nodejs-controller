import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateItemService from '@modules/items/services/CreateItemService';

export default class ItemsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, weight } = request.body;

    const createItem = container.resolve(CreateItemService);

    const item = await createItem.execute({
      name,
      price,
      weight,
    });

    return response.json(item);
  }
}
