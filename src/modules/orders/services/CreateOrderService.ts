import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IItem {
  id: string;
  weight: number;
  quantity: number;
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
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('Could not find any user with the given id');
    }

    const existentItems = await this.itemsRepository.findAllById(items);

    if (!existentItems.length) {
      throw new AppError('Could no find any products with the given ids');
    }

    const existentItemsIds = existentItems.map(item => item.id);

    const checkInexistentItems = items.filter(
      item => !existentItemsIds.includes(item.id),
    );

    if (checkInexistentItems.length) {
      throw new AppError(`Could not find item ${checkInexistentItems[0].id}`);
    }

    const serializedItems = items.map(item => ({
      item_id: item.id,
      quantity: item.quantity,
      weight: item.weight,
      price: existentItems.filter(p => p.id === item.id)[0].price,
    }));

    const order = await this.ordersRepository.create({
      user: userExists,
      items: serializedItems,
    });

    return order;
  }
}

export default CreateOrderService;
