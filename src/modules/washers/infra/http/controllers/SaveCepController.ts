import { Request, Response } from 'express';
import PostOffices from 'node-correios';

import SaveCepSearchService from '@modules/washers/services/SaveCepSearchService';

import { container } from 'tsyringe';

export default class SaveCepController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cep } = request.body;

    const saveCepSearch = container.resolve(SaveCepSearchService);
    const postOffices = new PostOffices();

    Number(cep);

    const postResponse = await postOffices.consultaCEP({ cep });

    const saveCep = await saveCepSearch.execute({
      cep,
      address: postResponse.logradouro,
      neighborhood: postResponse.bairro,
      location: postResponse.localidade,
      uf: postResponse.uf,
    });

    return response.json(saveCep);
  }
}
