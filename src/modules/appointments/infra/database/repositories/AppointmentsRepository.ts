import { Repository, getRepository } from 'typeorm';

import Appointment from '../entities/Appointment';
import {
  IFindAppointmentClashDTO,
  IAppointmentsRepository,
  ICreateAppointmentDTO,
} from '../../../repositories/IAppointmentsRepository';

class AppointmentsRepository implements IAppointmentsRepository {
  private baseRepository: Repository<Appointment>;

  constructor() {
    this.baseRepository = getRepository(Appointment);
  }

  public async create({
    consumerId,
    providerId,
    startDate,
    endDate,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const newAppointment = this.baseRepository.create({
      consumerId,
      providerId,
      startDate,
      endDate,
    });

    const appointment = await this.baseRepository.save(newAppointment);

    return appointment;
  }

  public async findClash({
    providerId,
    startDate,
    endDate,
  }: IFindAppointmentClashDTO): Promise<Appointment | undefined> {
    const appointment = this.baseRepository
      .createQueryBuilder()
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
