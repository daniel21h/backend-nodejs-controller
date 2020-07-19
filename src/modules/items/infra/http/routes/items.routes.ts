import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { getCustomRepository } from 'typeorm';
import ItemsController from '../controller/ItemsController';
import ListItemsRepository from '../../typeorm/repositories/ListItemsRepository';

const itemsRouter = Router();
const itemsController = new ItemsController();

itemsRouter.use(ensureAuthenticated);

itemsRouter.post('/', itemsController.create);
itemsRouter.get('/', async (request, response) => {
  const listItemsRepository = getCustomRepository(ListItemsRepository);

  // Aguardando retorno dos registros
  const items = await listItemsRepository.find();

  return response.json(items);
});

export default itemsRouter;
