import { uuid } from 'uuidv4';
import FakeAppointmentsRepository from '../../appointments/repositories/FakeAppointmentsRepository';
import FakeSuppliersRepository from '../repositories/FakeSuppliersRepository';
import ListAppointmentsOfSupplierService from './ListAppointmentsOfSupplierService';

const tomorrowAt = (hour: number): Date => {
  return new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1,
    hour,
  );
};

describe('List Appointment Service', () => {
  let appointmentsRepository: FakeAppointmentsRepository;
  let suppliersRepository: FakeSuppliersRepository;
  let service: ListAppointmentsOfSupplierService;
  const userId = uuid();
  const supplierId = uuid();

  beforeAll(() => {
    appointmentsRepository = new FakeAppointmentsRepository();
    suppliersRepository = new FakeSuppliersRepository();
    service = new ListAppointmentsOfSupplierService(
      appointmentsRepository,
      suppliersRepository,
    );
  });

  beforeEach(() => {
    appointmentsRepository.table = [
      {
        id: uuid(),
        customerId: uuid(),
        procedureId: uuid(),
        supplierId,
        startDate: tomorrowAt(9),
        endDate: tomorrowAt(10),
        price: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuid(),
        customerId: uuid(),
        procedureId: uuid(),
        supplierId,
        startDate: tomorrowAt(10),
        endDate: tomorrowAt(11),
        price: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
    suppliersRepository.table = [
      {
        id: supplierId,
        userId,
        latitude: 0,
        longitude: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
  });

  it('Should list appointments of supplier', async () => {
    const appointments = await service.execute({
      userId,
      supplierId,
      startDate: tomorrowAt(0),
      endDate: tomorrowAt(23),
    });
    expect(appointments).toHaveLength(2);
    expect(appointments[0]).toHaveProperty('customerId');
  });

  it('Should list appointments of other supplier with limited fields', async () => {
    const appointments = await service.execute({
      userId: uuid(),
      supplierId,
      startDate: tomorrowAt(0),
      endDate: tomorrowAt(23),
    });
    expect(appointments).toHaveLength(2);
    expect(appointments[0]).not.toHaveProperty('customerId');
  });
});
