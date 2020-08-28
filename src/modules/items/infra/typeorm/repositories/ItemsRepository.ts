import { getRepository, Repository, In } from 'typeorm';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import ICreateItemDTO from '@modules/items/dtos/ICreateItemDTO';
import IFindAllFromCategoryDTO from '@modules/items/dtos/IFindAllFromCategoryDTO';
import Item from '../entities/Item';
import Category from '../entities/Category';

interface IFindItems {
  id: string;
}

interface IFilterItems {
  category_id: string;
}

class ItemsRepository implements IItemsRepository {
  private ormRepository: Repository<Item>;

  constructor() {
    this.ormRepository = getRepository(Item);
  }

  public async create({
    name,
    category,
    price,
    weight,
  }: ICreateItemDTO): Promise<Item> {
    const categoryRepository = getRepository(Category);
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

    const item = await this.ormRepository.create({
      name,
      category: itemCategory,
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

  public async findAll(): Promise<Item[]> {
    const items = await this.ormRepository.find();

    return items;
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

  public async findAllItems(category_id: IFilterItems[]): Promise<Item[]> {
    const itemIds = category_id.map(item => item.category_id);

    const existentItems = await this.ormRepository.find({
      where: {
        category_id: In(itemIds),
      },
    });

    return existentItems;
  }
}

export default ItemsRepository;
