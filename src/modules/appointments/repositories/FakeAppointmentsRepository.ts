import { uuid } from 'uuidv4';
import {
  IAppointmentsRepository,
  ICreateAppointmentDTO,
  IFindAppointmentDTO,
} from './IAppointmentsRepository';
import FakeAppointment from '../entities/FakeAppointment';

export default class FakeAppointmentsRepository
  implements IAppointmentsRepository {
  public table: FakeAppointment[];

  constructor() {
    this.table = [];
  }

  public async create({
    consumerId,
    supplierId,
    startDate,
    endDate,
  }: ICreateAppointmentDTO): Promise<FakeAppointment> {
    const appointment = new FakeAppointment();

    appointment.id = uuid();
    appointment.consumerId = consumerId;
    appointment.supplierId = supplierId;
    appointment.startDate = startDate;
    appointment.endDate = endDate;
    appointment.createdAt = new Date();
    appointment.updatedAt = new Date();
    appointment.createdAt = null;

    this.table.push(appointment);

    return appointment;
  }

  public async findByConsumerId(
    consumerId: string,
  ): Promise<FakeAppointment[]> {
    return this.table.filter(
      appointment => appointment.consumerId === consumerId,
    );
  }

  public async findBySupplierId({
    supplierId,
    startDate,
    endDate,
  }: IFindAppointmentDTO): Promise<FakeAppointment[]> {
    return this.table.filter(
      appointment =>
        appointment.supplierId === supplierId &&
        !(appointment.endDate <= startDate || endDate <= appointment.startDate),
    );
  }
}
