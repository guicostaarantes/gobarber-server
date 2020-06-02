import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import IProcedure from '../../../entities/IProcedure';

@Entity('procedures')
class Procedure implements IProcedure {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'supplier_id' })
  supplierId: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column()
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

export default Procedure;
