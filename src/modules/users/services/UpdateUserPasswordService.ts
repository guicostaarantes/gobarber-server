import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IHashProvider } from '../../../shared/providers/HashProvider/IHashProvider';
import { ITokenProvider } from '../../../shared/providers/TokenProvider/ITokenProvider';
import AppError from '../../../shared/errors/AppError';

interface IServiceRequest {
  token: string;
  newPassword: string;
}

@injectable()
class UpdateUserPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute({ token, newPassword }: IServiceRequest): Promise<void> {
    const payload = await this.tokenProvider.check(token);

    if (payload.type !== 'forgot-password') {
      throw new AppError('Unauthorized.', 401);
    }

    const user = await this.usersRepository.findById(payload.subject, [
      'id',
      'password',
    ]);

    const newHashedPassword = await this.hashProvider.hash(newPassword);
    user.password = newHashedPassword;

    await this.usersRepository.update(user);
  }
}

export default UpdateUserPasswordService;
