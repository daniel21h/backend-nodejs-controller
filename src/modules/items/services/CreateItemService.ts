import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Item from '../infra/typeorm/entities/Item';
import IItemsRepository from '../repositories/IItemsRepository';

interface IRequest {
  name: string;
  category: string;
  price: number;
  weight: number;
}

@injectable()
class CreateItemsService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute({
    name,
    category,
    price,
    weight,
  }: IRequest): Promise<Item> {
    const itemExists = await this.itemsRepository.findByName(name);

    if (itemExists) {
      throw new AppError('This item already exist!');
    }

    const item = await this.itemsRepository.create({
      name,
      category,
      price,
      weight,
    });

    return item;
  }
}

export default CreateItemsService;
