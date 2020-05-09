import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import IAppointment from '../../../entities/IAppointment';

@Entity('appointments')
class Appointment implements IAppointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'consumer_id' })
  consumerId: string;

  @Column({ name: 'provider_id' })
  providerId: string;

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
