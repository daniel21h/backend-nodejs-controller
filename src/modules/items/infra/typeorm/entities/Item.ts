import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import OrdersItems from '@modules/orders/infra/typeorm/entities/OrdersItems';
import Category from './Category';

@Entity('items')
class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Category, category => category.item, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column('decimal')
  price: number;

  @Column('decimal')
  weight: number;

  @OneToMany(() => OrdersItems, order_items => order_items.item)
  order_items: OrdersItems[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Item;
