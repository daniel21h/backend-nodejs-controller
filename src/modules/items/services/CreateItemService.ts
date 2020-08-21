// import AppError from '@shared/errors/AppError';

import { getRepository } from 'typeorm';
import Item from '../infra/typeorm/entities/Item';
import Category from '../infra/typeorm/entities/Category';
// import IItemsRepository from '../repositories/IItemsRepository';

interface IRequest {
  name: string;
  category: string;
  price: number;
  weight: number;
}

class CreateItemService {
  public async execute({
    name,
    category,
    price,
    weight,
  }: IRequest): Promise<Item> {
    const itemRepository = getRepository(Item);
    const categoryRepository = getRepository(Category);

    // const { total } = await transactionsRepository.getBalance();

    // if (type === 'outcome' && total < value) {
    //   throw new AppError('You do not have enough balance');
    // }

    // Verificar se a categoria já existe
    // Existe? Buscar ela no DB e o usar o ID que foi retornado
    let itemCategory = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });

    if (!itemCategory) {
      // Não existe? Crio ela
      itemCategory = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(itemCategory);
    }

    const item = itemRepository.create({
      name,
      category: itemCategory,
      price,
      weight,
    });

    await itemRepository.save(item);

    return item;
  }
}

export default CreateItemService;
