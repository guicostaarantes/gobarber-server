import IAppointment from '../entities/IAppointment';

export interface IFindByDateDTO {
  providerId: string;
  startDate: Date;
  endDate: Date;
}

export interface IAppointmentsRepository {
  findClash(dto: IFindByDateDTO): Promise<IAppointment | undefined>;
}
