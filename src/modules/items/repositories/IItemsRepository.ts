import Item from '../infra/typeorm/entities/Item';

import ICreateItemDTO from '../dtos/ICreateItemDTO';
import IFindAllItemsDTO from '../dtos/IFindAllItemsDTO';
import IFindAllByCategoryDTO from '../dtos/IFindAllByCategoryDTO';

interface IFindItem {
  id: string;
  category: string;
}

interface IFindCItem {
  category: string;
}

export default interface IItemsRepository {
  create(data: ICreateItemDTO): Promise<Item>;
  findByName(name: string): Promise<Item | undefined>;
  findAll(item_id: IFindAllItemsDTO): Promise<Item[]>;
  findByCategory(category: IFindAllByCategoryDTO): Promise<Item[]>;
  findAllById(items: IFindItem[]): Promise<Item[]>;
  findAllByIdCategory(items: IFindCItem[]): Promise<Item[]>;
}
