import 'reflect-metadata';
import { uuid } from 'uuidv4';
import FakeSuppliersRepository from '../../suppliers/repositories/FakeSuppliersRepository';
import FakeProceduresRepository from '../repositories/FakeProceduresRepository';
import UpdateProcedureService from './UpdateProcedureService';
import AppError from '../../../shared/errors/AppError';

describe('Remove Procedure Service', () => {
  let suppliersRepository: FakeSuppliersRepository;
  let proceduresRepository: FakeProceduresRepository;
  let service: UpdateProcedureService;
  const fakeUserId = uuid();
  const fakeSupplierId = uuid();
  const fakeProcedureId = uuid();
  const fakeProcedureId2 = uuid();

  beforeAll(() => {
    suppliersRepository = new FakeSuppliersRepository();
    proceduresRepository = new FakeProceduresRepository();
    service = new UpdateProcedureService(
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

  it('Should update procedure of supplier', async () => {
    await expect(
      service.execute({
        userId: fakeUserId,
        id: fakeProcedureId,
        name: 'Procedure with new name',
      }),
    ).resolves.toBeTruthy();
    expect(proceduresRepository.table[0]).toHaveProperty(
      'name',
      'Procedure with new name',
    );
    await expect(
      service.execute({
        userId: fakeUserId,
        id: fakeProcedureId,
        price: 60,
      }),
    ).resolves.toBeTruthy();
    expect(proceduresRepository.table[0]).toHaveProperty('price', 60);
    await expect(
      service.execute({
        userId: fakeUserId,
        id: fakeProcedureId,
        duration: 60,
      }),
    ).resolves.toBeTruthy();
    expect(proceduresRepository.table[0]).toHaveProperty('duration', 60);
  });

  it('Should not update procedures of other suppliers', async () => {
    await expect(
      service.execute({
        userId: fakeUserId,
        id: fakeProcedureId2,
        name: 'Procedure with new name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not update procedures if supplier is not found', async () => {
    await expect(
      service.execute({
        userId: uuid(),
        id: fakeProcedureId,
        name: 'Procedure with new name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not update procedure if procedure is not found', async () => {
    await expect(
      service.execute({
        userId: fakeUserId,
        id: uuid(),
        name: 'Procedure with new name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
