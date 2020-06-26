import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import IAppointment from '../../../entities/IAppointment';
import User from '../../../../users/infra/database/entities/User';
import Supplier from '../../../../suppliers/infra/database/entities/Supplier';
import Procedure from '../../../../procedures/infra/database/entities/Procedure';

@Entity('appointments')
class Appointment implements IAppointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'customer_id' })
  customerId: string;

  @Column({ name: 'supplier_id' })
  supplierId: string;

  @Column({ name: 'procedure_id' })
  procedureId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: Promise<User>;

  @ManyToOne(() => Supplier)
  @JoinColumn({ name: 'supplier_id', referencedColumnName: 'id' })
  supplier: Promise<Supplier>;

  @ManyToOne(() => Procedure)
  @JoinColumn({ name: 'procedure_id', referencedColumnName: 'id' })
  procedure: Promise<Procedure>;

  @Column()
  price: number;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

export default Appointment;
