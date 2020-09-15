import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import Item from '@modules/items/infra/typeorm/entities/Item';

@Entity('orders_items')
class OrdersItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Appointment, order => order.order_items)
  @JoinColumn({ name: 'appointment_id' })
  order: Appointment;

  @ManyToOne(() => Item, item => item.order_items)
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @Column()
  item_id: string;

  @Column()
  appointment_id: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @Column('boolean')
  ironing: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersItems;
