import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('washers')
class Washer {
  @PrimaryGeneratedColumn('uuid')
  name: string;

  @Column()
  cpf: number;

  @Column()
  email: string;

  @Column()
  phone: number;

  @Column()
  machine_size: number;

  @Column()
  address_street: string;

  @Column()
  address_number: number;

  @Column()
  cep: number;

  @Column()
  ironing: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Washer;
