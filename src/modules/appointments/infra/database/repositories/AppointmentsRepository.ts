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
    customerId,
    supplierId,
    procedureId,
    price,
    startDate,
    endDate,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const newAppointment = this.baseRepository.create({
      customerId,
      supplierId,
      procedureId,
      price,
      startDate,
      endDate,
    });

    const appointment = await this.baseRepository.save(newAppointment);

    return appointment;
  }

  public async findByCustomerId(customerId: string): Promise<Appointment[]> {
    const appointments = await this.baseRepository.find({
      where: { customerId },
    });
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
      .orderBy('start_date')
      .getMany();
    await Promise.all(appointments.map(appointment => appointment.customer));
    await Promise.all(appointments.map(appointment => appointment.procedure));
    return appointments;
  }
}

export default AppointmentsRepository;
