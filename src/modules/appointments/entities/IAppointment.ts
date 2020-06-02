export default interface IAppointment {
  id: string;
  customerId: string;
  supplierId: string;
  procedureId: string;
  price: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
