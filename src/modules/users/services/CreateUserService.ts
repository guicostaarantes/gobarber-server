import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IUser from '../entities/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IHashProvider } from '../../../shared/providers/HashProvider/IHashProvider';

interface IServiceRequest {
  fullName: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    fullName,
    email,
    password,
  }: IServiceRequest): Promise<IUser> {
    const findByMail = await this.usersRepository.findByEmail(email, ['id']);

    if (findByMail) {
      throw new AppError(
        'There is another account with the same email address.',
        400,
      );
    }

    const hashPassword = await this.hashProvider.hash(password);

    const user = await this.usersRepository.create({
      fullName,
      email,
      password: hashPassword,
    });

    return user;
  }
}

export default CreateUserService;
