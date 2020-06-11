import 'reflect-metadata';
import { uuid } from 'uuidv4';
import FakeSuppliersRepository from '../../suppliers/repositories/FakeSuppliersRepository';
import FakeProceduresRepository from '../repositories/FakeProceduresRepository';
import CreateProcedureService from './CreateProcedureService';
import AppError from '../../../shared/errors/AppError';

describe('Create Procedure Service', () => {
  let suppliersRepository: FakeSuppliersRepository;
  let proceduresRepository: FakeProceduresRepository;
  let service: CreateProcedureService;
  const fakeUserId = uuid();
  const fakeSupplierId = uuid();

  beforeAll(() => {
    suppliersRepository = new FakeSuppliersRepository();
    proceduresRepository = new FakeProceduresRepository();
    service = new CreateProcedureService(
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
    proceduresRepository.table = [];
  });

  it('Should create procedure', async () => {
    await expect(
      service.execute({
        userId: fakeUserId,
        name: 'Name of procedure',
        duration: 15,
        price: 30,
      }),
    ).resolves.toBeTruthy();
  });

  it('Should not create procedure if user is not a supplier', async () => {
    await expect(
      service.execute({
        userId: uuid(),
        name: 'Name of procedure',
        duration: 15,
        price: 30,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not create procedure if there is another procedure with same name and same supplier', async () => {
    await expect(
      service.execute({
        userId: fakeUserId,
        name: 'Name of procedure',
        duration: 15,
        price: 30,
      }),
    ).resolves.toBeTruthy();
    await expect(
      service.execute({
        userId: fakeUserId,
        name: 'Name of procedure',
        duration: 15,
        price: 30,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not create procedure if duration is negative', async () => {
    await expect(
      service.execute({
        userId: uuid(),
        name: 'Name of procedure',
        duration: -15,
        price: 30,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not create procedure if price is negative', async () => {
    await expect(
      service.execute({
        userId: uuid(),
        name: 'Name of procedure',
        duration: 15,
        price: -30,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
