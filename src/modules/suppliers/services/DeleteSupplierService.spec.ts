import { uuid } from 'uuidv4';
import FakeUsersRepository from '../../users/repositories/FakeUsersRepository';
import FakeSuppliersRepository from '../repositories/FakeSuppliersRepository';
import DeleteSupplierService from './DeleteSupplierService';
import FakeHashProvider from '../../../shared/providers/HashProvider/implementations/FakeHashProvider';
import AppError from '../../../shared/errors/AppError';

describe('Delete Supplier Service', () => {
  let usersRepository: FakeUsersRepository;
  let suppliersRepository: FakeSuppliersRepository;
  let hashProvider: FakeHashProvider;
  let service: DeleteSupplierService;
  const id = uuid();

  beforeAll(() => {
    usersRepository = new FakeUsersRepository();
    suppliersRepository = new FakeSuppliersRepository();
    hashProvider = new FakeHashProvider();
    service = new DeleteSupplierService(suppliersRepository);
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
        latitude: 51.5074,
        longitude: -0.1278,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
  });

  it('Should delete supplier', async () => {
    await expect(service.execute(id)).resolves.toBeUndefined();
    expect(suppliersRepository.table.length).toEqual(0);
  });

  it('Should not update supplier that does not exist', async () => {
    await expect(service.execute(id)).rejects.toBeInstanceOf(AppError);
  });
});
