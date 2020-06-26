import { uuid } from 'uuidv4';
import FakeUsersRepository from '../../users/repositories/FakeUsersRepository';
import FakeSuppliersRepository from '../repositories/FakeSuppliersRepository';
import UpdateSupplierService from './UpdateSupplierService';
import FakeHashProvider from '../../../shared/providers/HashProvider/implementations/FakeHashProvider';
import AppError from '../../../shared/errors/AppError';

describe('Update Supplier Service', () => {
  let usersRepository: FakeUsersRepository;
  let suppliersRepository: FakeSuppliersRepository;
  let hashProvider: FakeHashProvider;
  let service: UpdateSupplierService;
  const id = uuid();

  beforeAll(() => {
    usersRepository = new FakeUsersRepository();
    suppliersRepository = new FakeSuppliersRepository();
    hashProvider = new FakeHashProvider();
    service = new UpdateSupplierService(suppliersRepository);
  });

  beforeEach(async () => {
    usersRepository.table = [
      {
        id,
        fullName: 'Fulano da Silva',
        email: 'fulano@teste.com.br',
        avatar: null,
        password: await hashProvider.hash('Ful4nO*2020'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
    suppliersRepository.table = [
      {
        id: uuid(),
        userId: id,
        name: 'Example Barber Shop',
        latitude: 51.5074,
        longitude: -0.1278,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
  });

  it('Should update supplier', async () => {
    await expect(
      service.execute({ userId: id, latitude: 48.8566, longitude: 2.3522 }),
    ).resolves.toBeTruthy();
    expect(suppliersRepository.table[0].latitude).toEqual(48.8566);
    expect(suppliersRepository.table[0].longitude).toEqual(2.3522);
  });

  it('Should not update supplier that does not exist', async () => {
    await expect(
      service.execute({ userId: uuid(), latitude: 48.8566, longitude: 2.3522 }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
