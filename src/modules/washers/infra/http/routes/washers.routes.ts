import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import WashersController from '../controllers/WashersController';
import ListWashersRepository from '../../typeorm/repositories/ListWashersRepository';
import SearchController from '../controllers/SearchController';
import SaveCepController from '../controllers/SaveCepController';

const washersRouter = Router();
const washersController = new WashersController();
const searchController = new SearchController();

const saveCepController = new SaveCepController();

washersRouter.post('/', washersController.create);

washersRouter.post('/cep', saveCepController.create);

washersRouter.get('/', async (request, response) => {
  const listWashersRepository = getCustomRepository(ListWashersRepository);

  // Aguardando retorno dos registros
  const washers = await listWashersRepository.find();

  return response.json(washers);
});

washersRouter.get('/search', searchController.show);

export default washersRouter;
