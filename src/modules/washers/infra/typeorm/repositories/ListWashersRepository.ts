import { EntityRepository, Repository } from 'typeorm';

import Washer from '../entities/Washer';

@EntityRepository(Washer)
export default class ListWashersRepository extends Repository<Washer> {
  public async getOrder(): Promise<Washer[]> {
    // Retornar o balanceKey
    const washers = await this.find();

    return washers;
  }
}
