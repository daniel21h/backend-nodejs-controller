import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateItemService from '@modules/items/services/CreateItemService';
// import ListItemsService from '@modules/items/services/ListItemsService';
// import ListItemsByCategoryService from '@modules/items/services/ListItemsByCategoryService';

export default class ItemsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, category, price, weight } = request.body;

    const createItem = container.resolve(CreateItemService);

    const item = await createItem.execute({
      name,
      category,
      price,
      weight,
    });

    return response.json(item);
  }
}
