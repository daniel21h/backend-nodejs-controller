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

  // public async index(request: Request, response: Response): Promise<Response> {
  //   // Retrieve user logged in to appointment
  //   const { category_id } = request.body;
  //   // const { id } = request.params;

  //   const listItemsRepository = container.resolve(ListItemsService);
  //   // const listUserOrders = container.resolve(ListUserOrdersService);

  //   const items = await listItemsRepository.execute({
  //     category_id: String(category_id),
  //   });

  //   // const order = await listUserOrders.execute({
  //   //   id,
  //   // });

  //   // Retornando a resposta ao usuário
  //   return response.json(items);
  // }
}
