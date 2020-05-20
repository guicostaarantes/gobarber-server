import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import IVacancy from '../../../entities/IVacancy';

@Entity('vacancies')
class Vacancy implements IVacancy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'supplier_id' })
  supplierId: string;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;
}

export default Vacancy;
