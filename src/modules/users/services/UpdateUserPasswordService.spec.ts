import { hash, compare } from 'bcryptjs';
import { uuid } from 'uuidv4';
import FakeUsersRepository from '../repositories/FakeUsersRepository';
import UpdateUserPasswordService from './UpdateUserPasswordService';
import FakeTokenProvider from '../../../shared/providers/TokenProvider/implementations/FakeTokenProvider';
import AppError from '../../../shared/errors/AppError';

describe('Update User Password Service', () => {
  let usersRepository: FakeUsersRepository;
  let tokenProvider: FakeTokenProvider;
  let service: UpdateUserPasswordService;
  const id = uuid();

  beforeAll(() => {
    usersRepository = new FakeUsersRepository();
    tokenProvider = new FakeTokenProvider();
    service = new UpdateUserPasswordService(usersRepository, tokenProvider);
  });

  beforeEach(async () => {
    const password = await hash('Ful4nO*2020', 8);
    usersRepository.table = [
      {
        id,
        fullName: 'Fulano da Silva',
        email: 'fulano@teste.com.br',
        isProvider: false,
        avatar: null,
        password,
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
      compare('Ful4nO*2020', usersRepository.table[0].password),
    ).resolves.toBeFalsy();
    await expect(
      compare('Ful4nO*2021', usersRepository.table[0].password),
    ).resolves.toBeTruthy();
  });

  it('Should not be able to reset the password if an invalid token is provided', async () => {
    const token = await tokenProvider.generate(id, 'access-token');
    await expect(
      service.execute({ token, newPassword: 'Ful4nO*2021' }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      compare('Ful4nO*2020', usersRepository.table[0].password),
    ).resolves.toBeTruthy();
    await expect(
      compare('Ful4nO*2021', usersRepository.table[0].password),
    ).resolves.toBeFalsy();
  });
});
