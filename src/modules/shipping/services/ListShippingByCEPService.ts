import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Shipping from '../infra/typeorm/entities/Shipping';
import IShippingRepository from '../repositories/IShippingRepository';

interface IRequest {
  neighborhood: string;
}

@injectable()
class ListShippingByCEPService {
  constructor(
    @inject('IShippingRepository')
    private shippingRepository: IShippingRepository,
  ) {}

  // List all service providers except the user who is listing
  public async execute({ neighborhood }: IRequest): Promise<Shipping[]> {
    try {
      const search = await this.shippingRepository.findByShippings(
        neighborhood,
      );

      return search;
    } catch (err) {
      throw new AppError('Ainda não cobrimos está regiao');
    }
  }
}

export default ListShippingByCEPService;
