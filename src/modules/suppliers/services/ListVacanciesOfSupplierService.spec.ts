import 'reflect-metadata';
import { uuid } from 'uuidv4';
import FakeSuppliersRepository from '../repositories/FakeSuppliersRepository';
import FakeVacanciesRepository from '../../vacancies/repositories/FakeVacanciesRepository';
import ListVacanciesOfSupplierService from './ListVacanciesOfSupplierService';
import AppError from '../../../shared/errors/AppError';

const tomorrowAt = (hour: number): Date => {
  return new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1,
    hour,
  );
};

describe('List Vacancies Of Supplier Service', () => {
  let suppliersRepository: FakeSuppliersRepository;
  let vacanciesRepository: FakeVacanciesRepository;
  let service: ListVacanciesOfSupplierService;
  const fakeUserId = uuid();
  const fakeSupplierId = uuid();

  beforeAll(() => {
    suppliersRepository = new FakeSuppliersRepository();
    vacanciesRepository = new FakeVacanciesRepository();
    service = new ListVacanciesOfSupplierService(
      suppliersRepository,
      vacanciesRepository,
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
    vacanciesRepository.table = [
      {
        id: uuid(),
        startDate: tomorrowAt(7),
        endDate: tomorrowAt(8),
        supplierId: fakeSupplierId,
      },
      {
        id: uuid(),
        startDate: tomorrowAt(9),
        endDate: tomorrowAt(10),
        supplierId: fakeSupplierId,
      },
      {
        id: uuid(),
        startDate: tomorrowAt(11),
        endDate: tomorrowAt(12),
        supplierId: uuid(),
      },
    ];
  });

  it('Should list vacancies of supplier', async () => {
    await expect(
      service.execute({
        supplierId: fakeSupplierId,
        startDate: tomorrowAt(7),
        endDate: tomorrowAt(11),
      }),
    ).resolves.toHaveLength(2);
  });

  it('Should not list vacancies if supplier is not found', async () => {
    await expect(
      service.execute({
        supplierId: uuid(),
        startDate: tomorrowAt(7),
        endDate: tomorrowAt(11),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
