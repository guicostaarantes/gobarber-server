import { uuid } from 'uuidv4';
import FakeAppointmentsRepository from '../repositories/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '../../../shared/errors/AppError';

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
  let service: CreateAppointmentService;

  beforeAll(() => {
    appointmentsRepository = new FakeAppointmentsRepository();
    service = new CreateAppointmentService(appointmentsRepository);
  });

  afterEach(() => {
    appointmentsRepository.table = [];
  });

  it('Should create new appointment', async () => {
    const appointment = await service.execute({
      consumerId: uuid(),
      providerId: uuid(),
      startDate: new Date(),
      endDate: new Date(),
    });
    expect(appointment).toHaveProperty('id');
    expect(appointmentsRepository.table).toHaveLength(1);
  });

  it('should not create new appointment if date is in the past', async () => {
    // TODO
  });

  it('Should not create new appointment if clashes with another appointment of same provider', async () => {
    // Create provider id to share in all requests
    const providerId = uuid();

    // Create first appointment
    const startDate1 = tomorrowAt(10);
    const endDate1 = tomorrowAt(12);

    await service.execute({
      consumerId: uuid(),
      providerId,
      startDate: startDate1,
      endDate: endDate1,
    });

    // Create second appointment with clash before first.
    const startDate2 = tomorrowAt(9);
    const endDate2 = tomorrowAt(11);

    await expect(
      service.execute({
        consumerId: uuid(),
        providerId,
        startDate: startDate2,
        endDate: endDate2,
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(appointmentsRepository.table).toHaveLength(1);

    // Create second appointment with clash after first.
    startDate2.setHours(11);
    endDate2.setHours(13);

    await expect(
      service.execute({
        consumerId: uuid(),
        providerId,
        startDate: startDate2,
        endDate: endDate2,
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(appointmentsRepository.table).toHaveLength(1);

    // Create second appointment with clash before and after first.
    startDate2.setHours(9);
    endDate2.setHours(13);

    await expect(
      service.execute({
        consumerId: uuid(),
        providerId,
        startDate: startDate2,
        endDate: endDate2,
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(appointmentsRepository.table).toHaveLength(1);

    // Create second appointment with no clashes (should NOT fail).
    startDate2.setHours(12);
    endDate2.setHours(14);

    await expect(
      service.execute({
        consumerId: uuid(),
        providerId,
        startDate: startDate2,
        endDate: endDate2,
      }),
    ).resolves.toBeTruthy();
    expect(appointmentsRepository.table).toHaveLength(2);
  });
});
