import IAppointment from '../entities/IAppointment';

export interface ICreateAppointmentDTO {
  customerId: string;
  supplierId: string;
  procedureId: string;
  price: number;
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
  findByCustomerId(customerId: string): Promise<IAppointment[]>;
  findBySupplierId(dto: IFindAppointmentDTO): Promise<IAppointment[]>;
}
