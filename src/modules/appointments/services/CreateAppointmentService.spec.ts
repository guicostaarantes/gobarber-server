import { uuid } from 'uuidv4';
import FakeAppointmentsRepository from '../repositories/FakeAppointmentsRepository';
import FakeProceduresRepository from '../../procedures/repositories/FakeProceduresRepository';
import FakeVacanciesRepository from '../../vacancies/repositories/FakeVacanciesRepository';
import CreateAppointmentService from './CreateAppointmentService';
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

describe('Create Appointment Service', () => {
  let appointmentsRepository: FakeAppointmentsRepository;
  let proceduresRepository: FakeProceduresRepository;
  let vacanciesRepository: FakeVacanciesRepository;
  let service: CreateAppointmentService;
  const procedureId = uuid();
  const supplierId = uuid();

  beforeAll(() => {
    appointmentsRepository = new FakeAppointmentsRepository();
    proceduresRepository = new FakeProceduresRepository();
    vacanciesRepository = new FakeVacanciesRepository();
    service = new CreateAppointmentService(
      appointmentsRepository,
      proceduresRepository,
      vacanciesRepository,
    );
  });

  beforeEach(() => {
    appointmentsRepository.table = [];
    proceduresRepository.table = [
      {
        id: procedureId,
        supplierId,
        name: 'Test procedure',
        duration: 120,
        price: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
    vacanciesRepository.table = [
      {
        id: uuid(),
        supplierId,
        startDate: yesterdayAt(8),
        endDate: yesterdayAt(18),
      },
      {
        id: uuid(),
        supplierId,
        startDate: tomorrowAt(8),
        endDate: tomorrowAt(18),
      },
    ];
  });

  it('Should create new appointment', async () => {
    const appointment = await service.execute({
      customerId: uuid(),
      procedureId,
      startDate: tomorrowAt(9),
    });
    expect(appointment).toHaveProperty('id');
    expect(appointmentsRepository.table).toHaveLength(1);
  });

  it('Should not create new appointment if procedure is not found', async () => {
    await expect(
      service.execute({
        customerId: uuid(),
        procedureId: uuid(),
        startDate: tomorrowAt(10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not create new appointment if there is no vacancy for the whole duration of the procedure', async () => {
    await expect(
      service.execute({
        customerId: uuid(),
        procedureId,
        startDate: tomorrowAt(17),
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      service.execute({
        customerId: uuid(),
        procedureId,
        startDate: tomorrowAt(7),
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      service.execute({
        customerId: uuid(),
        procedureId,
        startDate: tomorrowAt(20),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not create new appointment if date is in the past', async () => {
    await expect(
      service.execute({
        customerId: uuid(),
        procedureId,
        startDate: yesterdayAt(10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not create new appointment if clashes with another appointment of same provider', async () => {
    await expect(
      service.execute({
        customerId: uuid(),
        procedureId,
        startDate: tomorrowAt(10),
      }),
    ).resolves.toBeTruthy();

    await expect(
      service.execute({
        customerId: uuid(),
        procedureId,
        startDate: tomorrowAt(11),
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(appointmentsRepository.table).toHaveLength(1);

    await expect(
      service.execute({
        customerId: uuid(),
        procedureId,
        startDate: tomorrowAt(12),
      }),
    ).resolves.toBeTruthy();
    expect(appointmentsRepository.table).toHaveLength(2);
  });
});
