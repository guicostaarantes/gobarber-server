import { Repository, getRepository } from 'typeorm';

import Appointment from '../entities/Appointment';
import {
  IFindAppointmentDTO,
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
    supplierId,
    startDate,
    endDate,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const newAppointment = this.baseRepository.create({
      consumerId,
      supplierId,
      startDate,
      endDate,
    });

    const appointment = await this.baseRepository.save(newAppointment);

    return appointment;
  }

  public async findByConsumerId(consumerId: string): Promise<Appointment[]> {
    const appointments = await this.baseRepository.find({ where: consumerId });
    return appointments;
  }

  public async findBySupplierId({
    supplierId,
    startDate,
    endDate,
  }: IFindAppointmentDTO): Promise<Appointment[]> {
    const appointments = await this.baseRepository
      .createQueryBuilder()
      .where('supplier_id = :supplierId', { supplierId })
      .andWhere('NOT (end_date <= :startDate OR :endDate <= start_date)', {
        startDate,
        endDate,
      })
      .getMany();

    return appointments;
  }
}

export default AppointmentsRepository;
