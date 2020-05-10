import { uuid } from 'uuidv4';
import {
  IAppointmentsRepository,
  ICreateAppointmentDTO,
  IFindAppointmentClashDTO,
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
    providerId,
    startDate,
    endDate,
  }: ICreateAppointmentDTO): Promise<FakeAppointment> {
    const appointment = new FakeAppointment();

    appointment.id = uuid();
    appointment.consumerId = consumerId;
    appointment.providerId = providerId;
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

  public async findClash({
    providerId,
    startDate,
    endDate,
  }: IFindAppointmentClashDTO): Promise<FakeAppointment> {
    return this.table.find(
      appointment =>
        appointment.providerId === providerId &&
        ((appointment.startDate >= startDate &&
          appointment.startDate < endDate) ||
          (appointment.endDate > startDate && appointment.endDate <= endDate)),
    );
  }
}
