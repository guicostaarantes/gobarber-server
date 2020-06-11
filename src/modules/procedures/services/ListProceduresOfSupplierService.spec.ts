import 'reflect-metadata';
import { uuid } from 'uuidv4';
import FakeSuppliersRepository from '../../suppliers/repositories/FakeSuppliersRepository';
import FakeProceduresRepository from '../repositories/FakeProceduresRepository';
import ListProceduresOfSupplierService from './ListProceduresOfSupplierService';
import AppError from '../../../shared/errors/AppError';

describe('List Procedures Of Supplier Service', () => {
  let suppliersRepository: FakeSuppliersRepository;
  let proceduresRepository: FakeProceduresRepository;
  let service: ListProceduresOfSupplierService;
  const fakeUserId = uuid();
  const fakeSupplierId = uuid();

  beforeAll(() => {
    suppliersRepository = new FakeSuppliersRepository();
    proceduresRepository = new FakeProceduresRepository();
    service = new ListProceduresOfSupplierService(
      suppliersRepository,
      proceduresRepository,
    );
  });

  beforeEach(async () => {
    suppliersRepository.table = [
      {
        id: fakeSupplierId,
        userId: fakeUserId,
        name: 'Example Barber Shop',
        latitude: 51.5074,
        longitude: -0.1278,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
    proceduresRepository.table = [
      {
        id: uuid(),
        name: 'Procedure 1',
        price: 50,
        duration: 30,
        supplierId: fakeSupplierId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuid(),
        name: 'Procedure 2',
        price: 50,
        duration: 30,
        supplierId: fakeSupplierId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuid(),
        name: 'Procedure of other supplier',
        price: 50,
        duration: 30,
        supplierId: uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
  });

  it('Should list procedures of supplier', async () => {
    await expect(service.execute(fakeSupplierId)).resolves.toHaveLength(2);
  });

  it('Should not list procedures if supplier is not found', async () => {
    await expect(service.execute(uuid())).rejects.toBeInstanceOf(AppError);
  });
});
