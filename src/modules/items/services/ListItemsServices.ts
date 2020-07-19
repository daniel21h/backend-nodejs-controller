import { inject, injectable } from 'tsyringe';

// import IProductsRepository from '@modules/products/repositories/IProductsRepository';
// import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Item from '../infra/typeorm/entities/Item';
import IItemsRepository from '../repositories/IItemsRepository';

interface IRequest {
  item_id: string;
}

@injectable()
class ListItemsService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute({ item_id }: IRequest): Promise<Item[]> {
    const items = await this.itemsRepository.findAll({ item_id });

    return items;
  }
}

export default ListItemsService;
