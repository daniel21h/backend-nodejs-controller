import { EntityRepository, Repository } from 'typeorm';

import Category from '../entities/Category';
import Item from '../entities/Item';

@EntityRepository(Item)
class ListCategoryRepository extends Repository<Item> {
  public async getCategory(): Promise<Item[]> {
    const categories = await this.find({
      where: {
        category_id: "c3ebe5ba-1488-437f-8b69-294992916d48"
      }
    });

    return categories;
  }
}

export default ListCategoryRepository;
