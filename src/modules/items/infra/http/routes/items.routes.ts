import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import ItemsController from '../controller/ItemsController';
import ListItemsController from '../controller/ListItemsController';
import ListItemsRepository from '../../typeorm/repositories/ListItemsRepository';

const itemsRouter = Router();
const itemsRouterCreate = Router();
const itemsController = new ItemsController();
const listItemsController = new ListItemsController();

itemsRouterCreate.post('/', itemsController.create);

itemsRouter.get('/', async (request, response) => {
  const listItemsRepository = getCustomRepository(ListItemsRepository);

  // Aguardando retorno dos registros
  const items = await listItemsRepository.find();

  return response.json(items);
});

itemsRouter.get('/category', listItemsController.show);

// itemsRouter.get('/category', itemsController.index);

export default [itemsRouter, itemsRouterCreate];
