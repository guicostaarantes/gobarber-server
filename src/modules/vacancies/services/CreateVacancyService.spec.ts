import { uuid } from 'uuidv4';
import FakeSuppliersRepository from '../../suppliers/repositories/FakeSuppliersRepository';
import FakeVacanciesRepository from '../repositories/FakeVacanciesRepository';
import CreateVacancyService from './CreateVacancyService';
import AppError from '../../../shared/errors/AppError';

const yesterdayAt = (hour: number): Date => {
  return new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() - 1,
    hour,
  );
};

const tomorrowAt = (hour: number): Date => {
  return new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1,
    hour,
  );
};

describe('Create Vacancy Service', () => {
  let suppliersRepository: FakeSuppliersRepository;
  let vacanciesRepository: FakeVacanciesRepository;
  let service: CreateVacancyService;
  const id = uuid();

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
      service.execute({
        supplierId: id,
        startDate: tomorrowAt(8),
        endDate: tomorrowAt(10),
      }),
    ).resolves.toBeTruthy();
  });

  it('Should join vacancies if they overlap', async () => {
    await expect(
      service.execute({
        supplierId: id,
        startDate: tomorrowAt(8),
        endDate: tomorrowAt(9),
      }),
    ).resolves.toBeTruthy();
    expect(vacanciesRepository.table.length).toEqual(1);
    await expect(
      service.execute({
        supplierId: id,
        startDate: tomorrowAt(10),
        endDate: tomorrowAt(11),
      }),
    ).resolves.toBeTruthy();
    expect(vacanciesRepository.table.length).toEqual(2);
    await expect(
      service.execute({
        supplierId: id,
        startDate: tomorrowAt(12),
        endDate: tomorrowAt(13),
      }),
    ).resolves.toBeTruthy();
    expect(vacanciesRepository.table.length).toEqual(3);
    await expect(
      service.execute({
        supplierId: id,
        startDate: tomorrowAt(9),
        endDate: tomorrowAt(12),
      }),
    ).resolves.toBeTruthy();
    expect(vacanciesRepository.table.length).toEqual(1);
  });

  it('Should not create vacancy if no supplier is found', async () => {
    await expect(
      service.execute({
        supplierId: uuid(),
        startDate: tomorrowAt(8),
        endDate: tomorrowAt(10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not create vacancy if startDate is later than endDate', async () => {
    await expect(
      service.execute({
        supplierId: id,
        startDate: tomorrowAt(10),
        endDate: tomorrowAt(8),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not create vacancy if startDate and endDate are equal', async () => {
    await expect(
      service.execute({
        supplierId: id,
        startDate: tomorrowAt(8),
        endDate: tomorrowAt(8),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not create vacancy if endDate is in the past', async () => {
    await expect(
      service.execute({
        supplierId: id,
        startDate: yesterdayAt(8),
        endDate: yesterdayAt(10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
