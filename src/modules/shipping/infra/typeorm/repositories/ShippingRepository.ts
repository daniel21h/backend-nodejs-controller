import { getRepository, Repository } from 'typeorm';

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
