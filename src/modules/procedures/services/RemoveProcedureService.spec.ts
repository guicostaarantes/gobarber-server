import 'reflect-metadata';
import { uuid } from 'uuidv4';
import FakeSuppliersRepository from '../../suppliers/repositories/FakeSuppliersRepository';
import FakeProceduresRepository from '../repositories/FakeProceduresRepository';
import RemoveProcedureService from './RemoveProcedureService';
import AppError from '../../../shared/errors/AppError';

describe('Remove Procedure Service', () => {
  let suppliersRepository: FakeSuppliersRepository;
  let proceduresRepository: FakeProceduresRepository;
  let service: RemoveProcedureService;
  const fakeUserId = uuid();
  const fakeSupplierId = uuid();
  const fakeProcedureId = uuid();
  const fakeProcedureId2 = uuid();

  beforeAll(() => {
    suppliersRepository = new FakeSuppliersRepository();
    proceduresRepository = new FakeProceduresRepository();
    service = new RemoveProcedureService(
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
        id: fakeProcedureId,
        name: 'Procedure 1',
        price: 50,
        duration: 30,
        supplierId: fakeSupplierId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: fakeProcedureId2,
        name: 'Procedure 2',
        price: 50,
        duration: 30,
        supplierId: uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
  });

  it('Should remove procedure of supplier', async () => {
    await expect(
      service.execute({ userId: fakeUserId, id: fakeProcedureId }),
    ).resolves.toBeUndefined();
    expect(proceduresRepository.table).toHaveLength(1);
  });

  it('Should not remove procedures of other suppliers', async () => {
    await expect(
      service.execute({ userId: fakeUserId, id: fakeProcedureId2 }),
    ).rejects.toBeInstanceOf(AppError);
    expect(proceduresRepository.table).toHaveLength(2);
  });

  it('Should not remove procedures if supplier is not found', async () => {
    await expect(
      service.execute({ userId: uuid(), id: fakeProcedureId }),
    ).rejects.toBeInstanceOf(AppError);
    expect(proceduresRepository.table).toHaveLength(2);
  });

  it('Should not remove procedures if procedure is not found', async () => {
    await expect(
      service.execute({ userId: fakeUserId, id: uuid() }),
    ).rejects.toBeInstanceOf(AppError);
    expect(proceduresRepository.table).toHaveLength(2);
  });
});
