import { getRepository, Repository } from 'typeorm';

import ISaveCepRepository from '@modules/washers/repositories/ISaveCepRepository';
import ICreateSaveCepDTO from '@modules/washers/dtos/ICreateSaveCepDTO';
import SaveCepSearch from '../entities/SaveCepSearch';

class SaveCepRepository implements ISaveCepRepository {
  private ormRepository: Repository<SaveCepSearch>;

  constructor() {
    this.ormRepository = getRepository(SaveCepSearch);
  }

  public async create({
    cep,
    address,
    neighborhood,
    location,
    uf,
  }: ICreateSaveCepDTO): Promise<SaveCepSearch> {
    const saveCep = this.ormRepository.create({
      cep,
      address,
      neighborhood,
      location,
      uf,
    });

    await this.ormRepository.save(saveCep);

    return saveCep;
  }
}

export default SaveCepRepository;
