import { Request, Response } from 'express';

import SearchWasherByCep from '@modules/washers/services/SearchWasherByCep';

import { container } from 'tsyringe';

export default class SearchController {
  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { cep } = request.query;

      const searchRegion = container.resolve(SearchWasherByCep);

      const search = await searchRegion.execute({
        cep: String(cep),
      });

      return response.json(search);
    } catch (err) {
      return response.json({
        message: 'Não existe nenhum parceiro nesta região!',
      });
    }
  }
}
