import IProcedure from './IProcedure';

class FakeProcedure implements IProcedure {
  id: string;

  supplierId: string;

  name: string;

  duration: number;

  price: number;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
}

export default FakeProcedure;
