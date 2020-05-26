export default interface IAppointment {
  id: string;
  consumerId: string;
  supplierId: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
