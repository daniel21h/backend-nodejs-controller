import { getRepository, Repository } from 'typeorm';

import IWashersRepository from '@modules/washers/repositories/IWashersRepository';
import ICreateWasherDTO from '@modules/washers/dtos/ICreateWasherDTO';
import Washer from '../entities/Washer';

class WashersRepository implements IWashersRepository {
  private ormRepository: Repository<Washer>;

  constructor() {
    this.ormRepository = getRepository(Washer);
  }

  public async create({
    name,
    cpf,
    email,
    phone,
    machine_size,
    address_street,
    address_number,
    cep,
    ironing,
  }: ICreateWasherDTO): Promise<Washer> {
    const washer = this.ormRepository.create({
      name,
      cpf,
      email,
      phone,
      machine_size,
      address_street,
      address_number,
      cep,
      ironing,
    });

    await this.ormRepository.save(washer);

    return washer;
  }

  public async findByEmail(email: string): Promise<Washer | undefined> {
    const findWasher = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return findWasher;
  }
}

export default WashersRepository;
