import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    // TODO
  }

  public async create(request: Request, response: Response): Promise<Response> {
    // Retrieve user logged in to appointment
    // const user_id = request.user.id;
    const { user_id, items } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const user = await createOrder.execute({
      user_id,
      items,
    });

    return response.json(user);
  }
}
