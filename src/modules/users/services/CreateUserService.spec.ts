import FakeUsersRepository from '../repositories/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../../../shared/providers/HashProvider/implementations/FakeHashProvider';

describe('Create User Service', () => {
  let usersRepository: FakeUsersRepository;
  let hashProvider: FakeHashProvider;
  let service: CreateUserService;

  beforeAll(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    service = new CreateUserService(usersRepository, hashProvider);
  });

  afterEach(() => {
    usersRepository.table = [];
  });

  it('Should create user', async () => {
    await expect(
      service.execute({
        email: 'fulano@teste.com.br',
        fullName: 'Fulano da Silva',
        password: 'Ful4nO*2020',
      }),
    ).resolves.toBeTruthy();
    expect(usersRepository.table).toHaveLength(1);
  });

  it('Should not create user with already existing email', async () => {
    await expect(
      service.execute({
        email: 'fulano@teste.com.br',
        fullName: 'Fulano da Silva',
        password: 'Ful4nO*2020',
      }),
    ).resolves.toBeTruthy();
    await expect(
      service.execute({
        email: 'fulano@teste.com.br',
        fullName: 'Fulano da Silva',
        password: 'Ful4nO*2020',
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(usersRepository.table).toHaveLength(1);
  });
});
