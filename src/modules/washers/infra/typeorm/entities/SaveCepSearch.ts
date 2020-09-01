import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('save_cep_search')
class SaveCepSearch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cep: number;

  @Column()
  address: string;

  @Column()
  neighborhood: string;

  @Column()
  location: string;

  @Column()
  uf: string;

  @CreateDateColumn()
  created_at: Date;
}

export default SaveCepSearch;
