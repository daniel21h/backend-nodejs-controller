import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Washer from '../infra/typeorm/entities/Washer';
import IWashersRepository from '../repositories/IWashersRepository';

interface IRequest {
  name: string;
  cpf: number;
  email: string;
  phone: number;
  machine_size: number;
  address_street: string;
  address_number: number;
  cep: number;
  ironing: string;
}

@injectable()
class CreateWasherService {
  constructor(
    @inject('WashersRepository')
    private washersRepository: IWashersRepository,
  ) {}

  public async execute({
    name,
    cpf,
    email,
    phone,
    machine_size,
    address_street,
    address_number,
    cep,
    ironing,
  }: IRequest): Promise<Washer> {
    const washerExists = await this.washersRepository.findByEmail(email);

    if (washerExists) {
      throw new AppError('This e-mail is already assigned to a washer');
    }

    const washer = await this.washersRepository.create({
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

    return washer;
  }
}

export default CreateWasherService;
