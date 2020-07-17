import User from '@modules/users/infra/typeorm/entities/User';

interface IItem {
  item_id: string;
  price: number;
  weight: number;
}

export default interface ICreateOrderDTO {
  user: User[];
  items: IItem[];
}
