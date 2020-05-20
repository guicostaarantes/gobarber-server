import { uuid } from 'uuidv4';
import FakeSuppliersRepository from '../../suppliers/repositories/FakeSuppliersRepository';
import FakeVacanciesRepository from '../repositories/FakeVacanciesRepository';
import CreateVacancyService from './CreateVacancyService';
import AppError from '../../../shared/errors/AppError';

describe('Create Vacancy Service', () => {
  let suppliersRepository: FakeSuppliersRepository;
  let vacanciesRepository: FakeVacanciesRepository;
  let service: CreateVacancyService;
  const id = uuid();
  const date1 = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    new Date().getHours() + 2,
  );
  const date2 = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    new Date().getHours() + 4,
  );

  beforeAll(() => {
    suppliersRepository = new FakeSuppliersRepository();
    vacanciesRepository = new FakeVacanciesRepository();
    service = new CreateVacancyService(
      suppliersRepository,
      vacanciesRepository,
    );
  });

  beforeEach(async () => {
    suppliersRepository.table = [
      {
        id,
        userId: uuid(),
        latitude: 51.5074,
        longitude: -0.1278,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
    vacanciesRepository.table = [];
  });

  it('Should create vacancy', async () => {
    await expect(
      service.execute({ supplierId: id, startDate: date1, endDate: date2 }),
    ).resolves.toBeTruthy();
  });

  it('Should not create vacancy if startDate is later than endDate', async () => {
    await expect(
      service.execute({
        supplierId: id,
        startDate: date2,
        endDate: date1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not create vacancy if startDate and endDate are equal', async () => {
    await expect(
      service.execute({
        supplierId: id,
        startDate: date1,
        endDate: date1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not create vacancy if endDate is in the past', async () => {
    const date3 = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours() - 4,
    );
    const date4 = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours() - 2,
    );
    await expect(
      service.execute({
        supplierId: id,
        startDate: date3,
        endDate: date4,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
