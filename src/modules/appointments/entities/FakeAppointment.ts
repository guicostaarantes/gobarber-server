import FakeUser from '../../users/entities/FakeUser';
import FakeSupplier from '../../suppliers/entities/FakeSupplier';
import FakeProcedure from '../../procedures/entities/FakeProcedure';

export default class FakeAppointment {
  id: string;

  customerId: string;

  supplierId: string;

  procedureId: string;

  customer: Promise<FakeUser>;

  supplier: Promise<FakeSupplier>;

  procedure: Promise<FakeProcedure>;

  price: number;

  startDate: Date;

  endDate: Date;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
}
