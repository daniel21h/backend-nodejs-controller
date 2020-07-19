import { EntityRepository, Repository } from 'typeorm';

import Item from '../entities/Item';

@EntityRepository(Item)
class ListItemsRepository extends Repository<Item> {
  public async getBalance(): Promise<Item[]> {
    const items = await this.find();

    return items;
  }
}

export default ListItemsRepository;
