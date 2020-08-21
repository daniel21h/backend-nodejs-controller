import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateItemService from '@modules/items/services/CreateItemService';
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

  // public async index(request: Request, response: Response): Promise<Response> {
  //   const { category } = request.query;

  //   const listItemsByCategoryService = container.resolve(
  //     ListItemsByCategoryService,
  //   );

  //   const itemsCategory = await listItemsByCategoryService.execute({
  //     category,
  //   });

  //   // Retornando a resposta ao usuário
  //   return response.json(itemsCategory);
  // }
}
