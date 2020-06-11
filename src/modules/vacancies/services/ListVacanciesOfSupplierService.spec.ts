import { uuid } from 'uuidv4';
import FakeSuppliersRepository from '../../suppliers/repositories/FakeSuppliersRepository';
import FakeVacanciesRepository from '../repositories/FakeVacanciesRepository';
import ListVacanciesOfSupplierService from './ListVacanciesOfSupplierService';
import AppError from '../../../shared/errors/AppError';

describe('List Vacancies Of Supplier Service', () => {
  let suppliersRepository: FakeSuppliersRepository;
  let vacanciesRepository: FakeVacanciesRepository;
  let service: ListVacanciesOfSupplierService;
  const id = uuid();
  const date1 = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    new Date().getHours() + 1,
  );
  const date2 = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    new Date().getHours() + 3,
  );

  beforeAll(() => {
    suppliersRepository = new FakeSuppliersRepository();
    vacanciesRepository = new FakeVacanciesRepository();
    service = new ListVacanciesOfSupplierService(vacanciesRepository);
  });

  beforeEach(async () => {
    suppliersRepository.table = [
      {
        id,
        userId: uuid(),
        name: 'Example Barber Shop',
        latitude: 51.5074,
        longitude: -0.1278,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
    vacanciesRepository.table = [
      {
        id: uuid(),
        supplierId: id,
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          new Date().getHours() - 5,
        ),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          new Date().getHours() - 3,
        ),
      },
      {
        id: uuid(),
        supplierId: id,
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          new Date().getHours() - 2,
        ),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          new Date().getHours() + 2,
        ),
      },
      {
        id: uuid(),
        supplierId: id,
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          new Date().getHours() + 3,
        ),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          new Date().getHours() + 5,
        ),
      },
    ];
  });

  it('Should list vacancies', async () => {
    await expect(
      service.execute({ supplierId: id, startDate: date1, endDate: date2 }),
    ).resolves.toHaveLength(2);
  });

  it('Should not list vacancies if startDate is later than endDate', async () => {
    await expect(
      service.execute({
        supplierId: id,
        startDate: date2,
        endDate: date1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not list vacancies if startDate and endDate are equal', async () => {
    await expect(
      service.execute({
        supplierId: id,
        startDate: date1,
        endDate: date1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not list vacancies if startDate is in the past', async () => {
    const date3 = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours() - 1,
    );
    const date4 = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours() + 3,
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
