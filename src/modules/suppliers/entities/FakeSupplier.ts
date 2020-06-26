import ISupplier from './ISupplier';

class FakeSupplier implements ISupplier {
  id: string;

  userId: string;

  name: string;

  latitude: number;

  longitude: number;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
}

export default FakeSupplier;
