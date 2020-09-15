import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import ShippingController from '../controller/ShippingController';
import ListShippingsController from '../controller/ListShippingsController';
import ListShippingsRepository from '../../typeorm/repositories/ListShippingsRepository';

const itemsRouter = Router();
const itemsRouterCreate = Router();
const shippingController = new ShippingController();
const listShippingsController = new ListShippingsController();

itemsRouterCreate.post('/', shippingController.create);

itemsRouter.get('/', async (request, response) => {
  const listShippingsRepository = getCustomRepository(ListShippingsRepository);

  // Aguardando retorno dos registros
  const shippings = await listShippingsRepository.find();

  return response.json(shippings);
});

itemsRouter.get('/region', listShippingsController.show);

// itemsRouter.get('/category', itemsController.index);

export default [itemsRouter, itemsRouterCreate];
