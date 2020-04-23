import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { getRepository } from 'typeorm';

import User from '../models/User';
import AppError from '../errors/AppError';

interface ServiceRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: ServiceRequest): Promise<string> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

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
