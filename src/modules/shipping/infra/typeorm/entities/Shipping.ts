import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shipping')
class Shipping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  neighborhood: string;

  @Column()
  location: string;

  @Column()
  uf: string;

  @Column('decimal')
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Shipping;
