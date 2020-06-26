import { uuid } from 'uuidv4';
import FakeUsersRepository from '../../users/repositories/FakeUsersRepository';
import FakeSuppliersRepository from '../repositories/FakeSuppliersRepository';
import CreateSupplierService from './CreateSupplierService';
import FakeHashProvider from '../../../shared/providers/HashProvider/implementations/FakeHashProvider';
import AppError from '../../../shared/errors/AppError';

describe('Create Supplier Service', () => {
  let usersRepository: FakeUsersRepository;
  let suppliersRepository: FakeSuppliersRepository;
  let hashProvider: FakeHashProvider;
  let service: CreateSupplierService;
  const id = uuid();

  beforeAll(() => {
    usersRepository = new FakeUsersRepository();
    suppliersRepository = new FakeSuppliersRepository();
    hashProvider = new FakeHashProvider();
    service = new CreateSupplierService(usersRepository, suppliersRepository);
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
    suppliersRepository.table = [];
  });

  it('Should create supplier', async () => {
    await expect(
      service.execute({
        userId: id,
        name: 'Barber shop',
        latitude: 51.5074,
        longitude: -0.1278,
      }),
    ).resolves.toBeTruthy();
  });

  it('Should not create supplier for non existing user', async () => {
    await expect(
      service.execute({
        userId: uuid(),
        name: 'Barber shop',
        latitude: 51.5074,
        longitude: -0.1278,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
