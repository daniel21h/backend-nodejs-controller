import { inject, injectable } from 'tsyringe';

// import IProductsRepository from '@modules/products/repositories/IProductsRepository';
// import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Item from '../infra/typeorm/entities/Item';
import IItemsRepository from '../repositories/IItemsRepository';

interface IRequest {
  category: string;
}

@injectable()
class ListItemsByCategoryService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute({ category }: IRequest): Promise<Item[]> {
    const itemsByCategory = await this.itemsRepository.findAllByIdCategory({
      category,
    });

    return itemsByCategory;
  }
}

export default ListItemsByCategoryService;
