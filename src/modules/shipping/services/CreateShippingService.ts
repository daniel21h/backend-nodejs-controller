import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import Shipping from '../infra/typeorm/entities/Shipping';
import IShippingRepository from '../repositories/IShippingRepository';

interface IRequest {
  neighborhood: string;
  location: string;
  uf: string;
  price: number;
}

@injectable()
class CreateShippingService {
  constructor(
    @inject('ShippingRepository')
    private shippingRepository: IShippingRepository,
  ) {}

  public async execute({
    neighborhood,
    location,
    uf,
    price,
  }: IRequest): Promise<Shipping> {
    // const itemExists = await this.itemsRepository.findByName(name);

    // if (itemExists) {
    //   throw new AppError('This item already exist!');
    // }

    const shipping = await this.shippingRepository.create({
      neighborhood,
      location,
      uf,
      price,
    });

    return shipping;
  }
}

export default CreateShippingService;
