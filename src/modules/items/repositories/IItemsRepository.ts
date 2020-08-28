import Item from '../infra/typeorm/entities/Item';

import ICreateItemDTO from '../dtos/ICreateItemDTO';
import IFindAllItemsDTO from '../dtos/IFindAllItemsDTO';
import IFindAllFromCategoryDTO from '../dtos/IFindAllFromCategoryDTO';

interface IFindItem {
  id: string;
}

interface IFilterItems {
  category_id: string;
}

export default interface IItemsRepository {
  create(data: ICreateItemDTO): Promise<Item>;
  findByName(name: string): Promise<Item | undefined>;
  findAll(item_id: IFindAllItemsDTO): Promise<Item[]>;
  findAllById(items: IFindItem[]): Promise<Item[]>;
  findAllItems(category_id: IFilterItems[]): Promise<Item[]>;
  // findByCategoryItems(items: string): Promise<Item[]>;
}
