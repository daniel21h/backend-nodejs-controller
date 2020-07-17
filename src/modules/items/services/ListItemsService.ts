import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

// import AppError from '@shared/errors/AppError';
import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Item from '@modules/items/infra/typeorm/entities/Item';

interface IRequest {
  item_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  // List all service providers except the user who is listing
  public async execute({ item_id }: IRequest): Promise<Item[]> {
    let items = await this.cacheProvider.recover<Item[]>(
      `items-list:${item_id}`,
    );

    if (!items) {
      items = await this.itemsRepository.findAllItems({
        except_item_id: item_id,
      });

      // console.log('A query no banco foi feita!');

      await this.cacheProvider.save(
        `providers-list:${item_id}`,
        classToClass(items),
      );
    }

    return items;
  }
}

export default ListProvidersService;
