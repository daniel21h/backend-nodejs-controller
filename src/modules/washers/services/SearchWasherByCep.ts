import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import Washer from '../infra/typeorm/entities/Washer';
import IWashersRepository from '../repositories/IWashersRepository';

interface IRequest {
  cep: string;
}

@injectable()
class SearchWasherByCep {
  constructor(
    @inject('WashersRepository')
    private washersRepository: IWashersRepository,
  ) {}

  // List all service providers except the user who is listing
  public async execute({ cep }: IRequest): Promise<Washer[]> {
    const search = await this.washersRepository.findByCep(cep);

    return search;
  }
}

export default SearchWasherByCep;
