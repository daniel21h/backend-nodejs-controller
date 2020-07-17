import { getRepository, Repository, In, Not } from 'typeorm';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import ICreateItemDTO from '@modules/items/dtos/ICreateItemDTO';
import IFindAllItemsDTO from '@modules/items/dtos/IFindAllItemsDTO';
import Item from '../entities/Item';

interface IFindItems {
  id: string;
}

class ItemsRepository implements IItemsRepository {
  private ormRepository: Repository<Item>;

  constructor() {
    this.ormRepository = getRepository(Item);
  }

  public async create({ name, price, weight }: ICreateItemDTO): Promise<Item> {
    const item = await this.ormRepository.create({
      name,
      price,
      weight,
    });

    await this.ormRepository.save(item);

    return item;
  }

  public async findByName(name: string): Promise<Item | undefined> {
    const item = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return item;
  }

  public async findAllById(items: IFindItems[]): Promise<Item[]> {
    const itemIds = items.map(item => item.id);

    const existentItems = await this.ormRepository.find({
      where: {
        id: In(itemIds),
      },
    });

    return existentItems;
  }

  public async findAllItems({
    except_item_id,
  }: IFindAllItemsDTO): Promise<Item[]> {
    let items: Item[];

    if (except_item_id) {
      items = await this.ormRepository.find({
        where: {
          id: Not(except_item_id),
        },
      });
    } else {
      items = await this.ormRepository.find();
    }

    return items;
  }
}

export default ItemsRepository;
