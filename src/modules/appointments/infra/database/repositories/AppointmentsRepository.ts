import { Repository, EntityRepository } from 'typeorm';

import Appointment from '../entities/Appointment';
import {
  IFindByDateDTO,
  IAppointmentsRepository,
} from '../../../repositories/IAppointmentsRepository';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>
  implements IAppointmentsRepository {
  public async findClash({
    providerId,
    startDate,
    endDate,
  }: IFindByDateDTO): Promise<Appointment | undefined> {
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
    return appointment || undefined;
  }
}

export default AppointmentsRepository;
