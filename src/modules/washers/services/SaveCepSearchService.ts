import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import SaveCepSearch from '../infra/typeorm/entities/SaveCepSearch';
import ISaveCepRepository from '../repositories/ISaveCepRepository';
import ICreateSaveCepDTO from '../dtos/ICreateSaveCepDTO';

@injectable()
class SaveCepSearchService {
  constructor(
    @inject('SaveCepRepository')
    private saveCepRepository: ISaveCepRepository,
  ) {}

  // List all service providers except the user who is listing
  public async execute({
    cep,
    address,
    neighborhood,
    location,
    uf,
  }: ICreateSaveCepDTO): Promise<SaveCepSearch> {
    const savecep = await this.saveCepRepository.create({
      cep,
      address,
      neighborhood,
      location,
      uf,
    });

    return savecep;
  }
}

export default SaveCepSearchService;
