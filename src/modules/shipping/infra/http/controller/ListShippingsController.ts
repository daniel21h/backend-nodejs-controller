import { Request, Response } from 'express';
import PostOffices from 'node-correios';

import ListItemsFromCategoryService from '@modules/items/services/ListItemsFromCategoryService';

import { container } from 'tsyringe';

export default class SearchController {
  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { cep } = request.query;

      const itemContainer = container.resolve(ListItemsFromCategoryService);

      const postOffices = new PostOffices();

      Number(cep);

      const postResponse = await postOffices.consultaCEP({ cep });

      const shipping = await itemContainer.execute({
        neighborhood: postResponse.bairro,
      });

      return response.json(shipping);
    } catch (err) {
      return response.json({
        message: 'Nenhum item encontrado!',
      });
    }
  }
}
