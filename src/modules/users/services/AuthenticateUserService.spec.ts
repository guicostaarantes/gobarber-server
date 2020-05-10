import { hash } from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import { uuid } from 'uuidv4';
import FakeUsersRepository from '../repositories/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import AppError from '../../../shared/errors/AppError';

interface ITokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

describe('Authenticate User Service', () => {
  let usersRepository: FakeUsersRepository;
  let service: AuthenticateUserService;
  const id = uuid();

  beforeAll(() => {
    usersRepository = new FakeUsersRepository();
    service = new AuthenticateUserService(usersRepository);
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

  it('Should get token with correct credentials', async () => {
    const token = await service.execute({
      email: 'fulano@teste.com.br',
      password: 'Ful4nO*2020',
    });
    const payload = verify(token, process.env.JWT_SECRET_KEY) as ITokenPayload;
    expect(payload.sub).toBe(id);
    expect(Object.keys(payload)).toHaveLength(3);
  });

  it('Should not get token with incorrect password', async () => {
    await expect(
      service.execute({
        email: 'fulano@teste.com.br',
        password: 'Ful4nO*2019',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not get token with non-existing email', async () => {
    await expect(
      service.execute({
        email: 'fulano@teste.com',
        password: 'Ful4nO*2019',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
