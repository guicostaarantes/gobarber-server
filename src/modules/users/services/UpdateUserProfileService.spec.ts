import { hash } from 'bcryptjs';
import { uuid } from 'uuidv4';
import FakeUsersRepository from '../repositories/FakeUsersRepository';
import UpdateUserProfileService from './UpdateUserProfileService';
import AppError from '../../../shared/errors/AppError';

describe('Update User Profile Service', () => {
  let usersRepository: FakeUsersRepository;
  let service: UpdateUserProfileService;
  const id = uuid();

  beforeAll(() => {
    usersRepository = new FakeUsersRepository();
    service = new UpdateUserProfileService(usersRepository);
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

  it('Should be able to change full name of user', async () => {
    await expect(
      service.execute({ userId: id, fullName: 'Ciclano da Silva' }),
    ).resolves.toBeUndefined();
    expect(usersRepository.table[0].fullName).toEqual('Ciclano da Silva');
    expect(usersRepository.table[0].email).toEqual('fulano@teste.com.br');
  });

  it('Should not be able to change email of user', async () => {
    await expect(
      service.execute({ userId: id, email: 'ciclano@teste.com.br' } as never),
    ).rejects.toBeInstanceOf(AppError);
    expect(usersRepository.table[0].email).toEqual('fulano@teste.com.br');
  });

  it('Should keep the full name of user if no name is informed', async () => {
    await expect(service.execute({ userId: id })).resolves.toBeUndefined();
    expect(usersRepository.table[0].fullName).toEqual('Fulano da Silva');
  });
});
