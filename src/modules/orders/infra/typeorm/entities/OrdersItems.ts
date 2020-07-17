import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import Item from '@modules/items/infra/typeorm/entities/Item';

@Entity('orders_items')
class OrdersItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, order => order.order_items)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Item, item => item.order_items)
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @Column()
  item_id: string;

  @Column()
  order_id: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersItems;
