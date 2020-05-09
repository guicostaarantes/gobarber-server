import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../../../shared/errors/AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IServiceRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: IServiceRequest): Promise<string> {
    const user = await this.usersRepository.findByEmail(email, [
      'id',
      'password',
    ]);

    if (!user) {
      throw new AppError('Invalid credentials', 403);
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new AppError('Invalid credentials', 403);
    }

    const token = sign({}, process.env.JWT_SECRET_KEY, {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
  }
}

export default AuthenticateUserService;
