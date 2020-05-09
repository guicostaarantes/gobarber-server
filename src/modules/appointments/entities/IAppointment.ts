export default interface IAppointment {
  id: string;
  consumerId: string;
  providerId: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
