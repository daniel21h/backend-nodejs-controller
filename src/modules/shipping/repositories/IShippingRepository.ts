import Shipping from '../infra/typeorm/entities/Shipping';

import ICreateShippingDTO from '../dtos/ICreateShippingDTO';
// import IFindAllByRegionDTO from '../dtos/IFindAllByRegionDTO';

interface IFindShippingCEP {
  neighborhood: string;
}

export default interface IShippingsRepository {
  create(data: ICreateShippingDTO): Promise<Shipping>;
  findByName(name: string): Promise<Shipping | undefined>;
  findByCEP({ neighborhood }: IFindShippingCEP): Promise<Shipping[]>;
  // findAll(Shipping_id: IFindAllShippingsDTO): Promise<Shipping[]>;
  findByShippings(name: string): Promise<Shipping[]>;
}
