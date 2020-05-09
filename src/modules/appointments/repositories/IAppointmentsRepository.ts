import IAppointment from '../entities/IAppointment';

export interface ICreateAppointmentDTO {
  consumerId: string;
  providerId: string;
  startDate: Date;
  endDate: Date;
}

export interface IFindAppointmentClashDTO {
  providerId: string;
  startDate: Date;
  endDate: Date;
}

export interface IAppointmentsRepository {
  create(dto: ICreateAppointmentDTO): Promise<IAppointment>;
  findByConsumerId(consumerId: string): Promise<IAppointment[]>;
  findClash(dto: IFindAppointmentClashDTO): Promise<IAppointment>;
}
