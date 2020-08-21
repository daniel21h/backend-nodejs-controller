interface IItem {
  item_id: string;
  price: number;
  weight: number;
}

export default interface ICreateAppointmentDTO {
  provider_id: string;
  user_id: string;
  date: Date;
  delivery_date: Date;
  items: IItem[];
}
