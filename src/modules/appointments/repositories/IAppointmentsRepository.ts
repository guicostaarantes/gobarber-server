import IAppointment from '../entities/IAppointment';

export interface ICreateAppointmentDTO {
  consumerId: string;
  supplierId: string;
  startDate: Date;
  endDate: Date;
}

export interface IFindAppointmentDTO {
  supplierId: string;
  startDate: Date;
  endDate: Date;
}

export interface IAppointmentsRepository {
  create(dto: ICreateAppointmentDTO): Promise<IAppointment>;
  findByConsumerId(consumerId: string): Promise<IAppointment[]>;
  findBySupplierId(dto: IFindAppointmentDTO): Promise<IAppointment[]>;
}
