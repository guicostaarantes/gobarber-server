import { Repository, EntityRepository } from 'typeorm';

import Appointment from '../entities/Appointment';

interface FindByDateDTO {
  providerId: string;
  startDate: Date;
  endDate: Date;
}

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findClash({
    providerId,
    startDate,
    endDate,
  }: FindByDateDTO): Promise<Appointment | null> {
    const appointment = this.createQueryBuilder()
      .where('start_date >= :startDate AND start_date < :endDate', {
        startDate,
        endDate,
      })
      .orWhere('end_date > :startDate AND end_date <= :endDate', {
        startDate,
        endDate,
      })
      .andWhere('provider_id = :pid', { pid: providerId })
      .getOne();
    return appointment || null;
  }
}

export default AppointmentsRepository;
