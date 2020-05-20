import { uuid } from 'uuidv4';
import FakeSuppliersRepository from '../../suppliers/repositories/FakeSuppliersRepository';
import FakeVacanciesRepository from '../repositories/FakeVacanciesRepository';
import CreateAntiVacancyService from './CreateAntiVacancyService';
import AppError from '../../../shared/errors/AppError';

describe('Create Anti Vacancy Service', () => {
  let suppliersRepository: FakeSuppliersRepository;
  let vacanciesRepository: FakeVacanciesRepository;
  let service: CreateAntiVacancyService;
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
    service = new CreateAntiVacancyService(
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
    vacanciesRepository.table = [
      { id: uuid(), supplierId: id, startDate: date1, endDate: date2 },
    ];
  });

  it('Should create anti-vacancy', async () => {
    const date3 = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours() + 2,
      30,
    );
    const date4 = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours() + 3,
      30,
    );
    await expect(
      service.execute({ supplierId: id, startDate: date3, endDate: date4 }),
    ).resolves.toBeTruthy();
    expect(vacanciesRepository.table.length).toEqual(2);
  });

  it('Should not create anti-vacancy if startDate is later than endDate', async () => {
    await expect(
      service.execute({
        supplierId: id,
        startDate: date2,
        endDate: date1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not create anti-vacancy if startDate and endDate are equal', async () => {
    await expect(
      service.execute({
        supplierId: id,
        startDate: date1,
        endDate: date1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not create anti-vacancy if endDate is in the past', async () => {
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