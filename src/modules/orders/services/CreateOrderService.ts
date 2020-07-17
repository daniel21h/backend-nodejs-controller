import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IItem {
  id: string;
}

interface IRequest {
  user_id: string;
  items: IItem[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, items }: IRequest): Promise<Order> {
    // TODO
  }
}

export default CreateOrderService;
