import Shipping from '../infra/typeorm/entities/Shipping';

import ICreateShippingDTO from '../dtos/ICreateShippingDTO';
// import IFindAllByRegionDTO from '../dtos/IFindAllByRegionDTO';

export default interface IShippingsRepository {
  create(data: ICreateShippingDTO): Promise<Shipping>;
  findByShippings(name: string): Promise<Shipping[]>;
}
