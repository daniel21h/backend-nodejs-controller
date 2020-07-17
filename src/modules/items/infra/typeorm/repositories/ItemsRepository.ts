import { getRepository, Repository, In } from 'typeorm';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import ICreateItemDTO from '@modules/items/dtos/ICreateItemDTO';
import Item from '../entities/Item';

interface IFindItems {
  id: string;
}

class ItemsRepository implements IItemsRepository {
  private ormRepository: Repository<Items>;

  constructor() {
    this.ormRepository = getRepository(Item);
  }

  public async create({ name, price, weight }: ICreateItemDTO): Promise<Item> {
    // TODO
  }

  public async findByName(name: string): Promise<Item | undefined> {
    // TODO
  }

  public async findAllById(items: IFindItems[]): Promise<Item[]> {
    // TODO
  }
}

export default ItemsRepository;
