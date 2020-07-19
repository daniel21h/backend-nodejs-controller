import Washer from '../infra/typeorm/entities/Washer';

import ICreateWasherDTO from '../dtos/ICreateWasherDTO';

export default interface IWashersRepository {
  create(data: ICreateWasherDTO): Promise<Washer>;
  findByEmail(email: string): Promise<Washer | undefined>;
}
