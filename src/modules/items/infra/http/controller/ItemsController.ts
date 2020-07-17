import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateItemService from '@modules/items/services/CreateItemService';
import ListItemsService from '@modules/items/services/ListItemsService';
import { classToClass } from 'class-transformer';

export default class ItemsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listItems = container.resolve(ListItemsService);

    // Retornando a resposta ao usuário
    return response.json(classToClass(listItems));
  }

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
