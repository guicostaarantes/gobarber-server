import IUser from '../../users/entities/IUser';
import ISupplier from '../../suppliers/entities/ISupplier';
import IProcedure from '../../procedures/entities/IProcedure';

export default interface IAppointment {
  id: string;
  customerId: string;
  supplierId: string;
  procedureId: string;
  customer?: Promise<IUser>;
  supplier?: Promise<ISupplier>;
  procedure?: Promise<IProcedure>;
  price: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
