import { uuid } from 'uuidv4';
import FakeUsersRepository from '../repositories/FakeUsersRepository';
import UpdateUserPasswordService from './UpdateUserPasswordService';
import FakeHashProvider from '../../../shared/providers/HashProvider/implementations/FakeHashProvider';
import FakeTokenProvider from '../../../shared/providers/TokenProvider/implementations/FakeTokenProvider';
import AppError from '../../../shared/errors/AppError';

describe('Update User Password Service', () => {
  let usersRepository: FakeUsersRepository;
  let hashProvider: FakeHashProvider;
  let tokenProvider: FakeTokenProvider;
  let service: UpdateUserPasswordService;
  const id = uuid();

  beforeAll(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    tokenProvider = new FakeTokenProvider();
    service = new UpdateUserPasswordService(
      usersRepository,
      hashProvider,
      tokenProvider,
    );
  });

  beforeEach(async () => {
    usersRepository.table = [
      {
        id,
        fullName: 'Fulano da Silva',
        email: 'fulano@teste.com.br',
        isProvider: false,
        avatar: null,
        password: await hashProvider.hash('Ful4nO*2020'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
  });

  it('Should be able to reset the password if a valid token is provided', async () => {
    const token = await tokenProvider.generate(id, 'forgot-password');
    await expect(
      service.execute({ token, newPassword: 'Ful4nO*2021' }),
    ).resolves.toBeUndefined();
    await expect(
      hashProvider.compare('Ful4nO*2020', usersRepository.table[0].password),
    ).resolves.toBeFalsy();
    await expect(
      hashProvider.compare('Ful4nO*2021', usersRepository.table[0].password),
    ).resolves.toBeTruthy();
  });

  it('Should not be able to reset the password if an invalid token is provided', async () => {
    const token = await tokenProvider.generate(id, 'access-token');
    await expect(
      service.execute({ token, newPassword: 'Ful4nO*2021' }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      hashProvider.compare('Ful4nO*2020', usersRepository.table[0].password),
    ).resolves.toBeTruthy();
    await expect(
      hashProvider.compare('Ful4nO*2021', usersRepository.table[0].password),
    ).resolves.toBeFalsy();
  });
});
