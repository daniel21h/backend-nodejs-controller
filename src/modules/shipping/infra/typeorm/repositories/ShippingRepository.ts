import { getRepository, Repository, In } from 'typeorm';

import IShippingRepository from '@modules/shipping/repositories/IShippingRepository';
import ICreateShippingDTO from '@modules/shipping/dtos/ICreateShippingDTO';
import Shipping from '../entities/Shipping';

interface IFindShipping {
  id: string;
}

class ShippingRepository implements IShippingRepository {
  private ormRepository: Repository<Shipping>;

  constructor() {
    this.ormRepository = getRepository(Shipping);
  }

  public async create({
    neighborhood,
    location,
    uf,
    price,
  }: ICreateShippingDTO): Promise<Shipping> {
    const shipping = await this.ormRepository.create({
      neighborhood,
      location,
      uf,
      price,
    });

    await this.ormRepository.save(shipping);

    return shipping;
  }

  // public async findByName(name: string): Promise<Item | undefined> {
  //   const item = await this.ormRepository.findOne({
  //     where: {
  //       name,
  //     },
  //   });

  //   return item;
  // }

  // public async findAll(): Promise<Item[]> {
  //   const items = await this.ormRepository.find();

  //   return items;
  // }

  // public async findAllById(items: IFindItems[]): Promise<Item[]> {
  //   const itemIds = items.map(item => item.id);

  //   const existentItems = await this.ormRepository.find({
  //     where: {
  //       id: In(itemIds),
  //     },
  //   });

  //   return existentItems;
  // }

  // public async findAllItems(category_id: IFilterItems[]): Promise<Item[]> {
  //   const itemIds = category_id.map(item => item.category_id);

  //   const existentItems = await this.ormRepository.find({
  //     where: {
  //       category_id: In(itemIds),
  //     },
  //   });

  //   return existentItems;
  // }

  public async findByShippings(neighborhood: string): Promise<Shipping[]> {
    const shipping = await this.ormRepository.find({
      where: {
        neighborhood,
      },
    });

    return shipping;
  }
}

export default ShippingRepository;
