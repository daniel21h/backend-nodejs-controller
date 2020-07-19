import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import WashersController from '../controllers/WashersController';
import ListWashersRepository from '../../typeorm/repositories/ListWashersRepository';

const washersRouter = Router();
const washersController = new WashersController();

washersRouter.post('/', washersController.create);

washersRouter.get('/', async (request, response) => {
  const listWashersRepository = getCustomRepository(ListWashersRepository);

  // Aguardando retorno dos registros
  const washers = await listWashersRepository.find();

  return response.json(washers);
});

export default washersRouter;
