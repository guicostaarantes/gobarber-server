import { uuid } from 'uuidv4';
import FakeAppointmentsRepository from '../repositories/FakeAppointmentsRepository';
import ListAppointmentsService from './ListAppointmentsService';

describe('List Appointment Service', () => {
  let appointmentsRepository: FakeAppointmentsRepository;
  let service: ListAppointmentsService;
  const customerId = uuid();

  beforeAll(() => {
    appointmentsRepository = new FakeAppointmentsRepository();
    service = new ListAppointmentsService(appointmentsRepository);
  });

  beforeEach(() => {
    appointmentsRepository.table = [
      {
        id: uuid(),
        customerId,
        procedureId: uuid(),
        supplierId: uuid(),
        startDate: new Date(),
        endDate: new Date(),
        price: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuid(),
        customerId,
        procedureId: uuid(),
        supplierId: uuid(),
        startDate: new Date(),
        endDate: new Date(),
        price: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
  });

  it('Should list appointments', async () => {
    const appointments = await service.execute({
      customerId,
    });
    expect(appointments).toHaveLength(2);
  });

  it('Should not list appointments from other users', async () => {
    const appointments = await service.execute({
      customerId: uuid(),
    });
    expect(appointments).toHaveLength(0);
  });
});
