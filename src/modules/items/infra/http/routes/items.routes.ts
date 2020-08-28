import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import ItemsController from '../controller/ItemsController';
import ListItemsRepository from '../../typeorm/repositories/ListItemsRepository';
import ListCategoryRepository from '../../typeorm/repositories/ListCategoryRepository';

const itemsRouter = Router();
const itemsRouterCreate = Router();
const itemsController = new ItemsController();

itemsRouterCreate.post('/', itemsController.create);

itemsRouter.get('/', async (request, response) => {
  const listItemsRepository = getCustomRepository(ListItemsRepository);

  // Aguardando retorno dos registros
  const items = await listItemsRepository.find();

  return response.json(items);
});

itemsRouter.get('/c', async (request, response) => {
  const listCategoryRepository = getCustomRepository(ListCategoryRepository);

  // Aguardando retorno dos registros
  const categories = await listCategoryRepository.find();

  return response.json(categories);
});

// itemsRouter.get('/category', itemsController.index);


export default [itemsRouter, itemsRouterCreate];
