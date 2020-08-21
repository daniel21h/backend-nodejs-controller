import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import OrdersItems from '@modules/orders/infra/typeorm/entities/OrdersItems';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @Column('timestamp with time zone')
  delivery_date: Date;

  @OneToMany(() => OrdersItems, order_items => order_items.order, {
    cascade: true,
  })
  order_items: OrdersItems[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
