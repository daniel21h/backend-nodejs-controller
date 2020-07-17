import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  price: number;
  category: string;
}

class CreateItemService {
  constructor() {}

  public async execute({ name, price, weight }: IRequest): Promise<void> {
    // TODO
  }
}

export default CreateItemService;
