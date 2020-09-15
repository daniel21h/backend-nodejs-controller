import { EntityRepository, Repository } from 'typeorm';

import Shipping from '../entities/Shipping';

@EntityRepository(Shipping)
class ListShippingRepository extends Repository<Shipping> {
  public async getBalance(): Promise<Shipping[]> {
    const shipping = await this.find();

    return shipping;
  }
}

export default ListShippingRepository;
