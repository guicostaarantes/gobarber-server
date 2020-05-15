import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IHashProvider } from '../../../shared/providers/HashProvider/IHashProvider';
import { ITokenProvider } from '../../../shared/providers/TokenProvider/ITokenProvider';

interface IServiceRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute({ email, password }: IServiceRequest): Promise<string> {
    const user = await this.usersRepository.findByEmail(email, [
      'id',
      'password',
    ]);

    if (!user) {
      throw new AppError('Invalid credentials', 403);
    }

    const comparePassword = await this.hashProvider.compare(
      password,
      user.password,
    );

    if (!comparePassword) {
      throw new AppError('Invalid credentials', 403);
    }

    const token = await this.tokenProvider.generate(user.id, 'access-token');

    return token;
  }
}

export default AuthenticateUserService;
