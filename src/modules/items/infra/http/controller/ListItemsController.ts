import { Request, Response } from 'express';

import ListItemsFromCategoryService from '@modules/items/services/ListItemsFromCategoryService';

import { container } from 'tsyringe';

export default class SearchController {
  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { category } = request.query;

      const itemContainer = container.resolve(ListItemsFromCategoryService);

      const items = await itemContainer.execute({
        category: String(category),
      });

      return response.json(items);
    } catch (err) {
      return response.json({
        message: 'Nenhum item encontrado!',
      });
    }
  }
}
