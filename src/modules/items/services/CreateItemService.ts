import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Item from '../infra/typeorm/entities/Item';
import IItemsRepository from '../repositories/IItemsRepository';

interface IRequest {
  name: string;
  price: number;
  weight: number;
}

@injectable()
class CreateItemService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute({ name, price, weight }: IRequest): Promise<Item> {
    const itemExists = await this.itemsRepository.findByName(name);

    if (itemExists) {
      throw new AppError('There is already one item with this name');
    }

    const item = await this.itemsRepository.create({
      name,
      price,
      weight,
    });

    return item;
  }
}

export default CreateItemService;
