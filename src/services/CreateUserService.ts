import { hash } from 'bcryptjs';

import { getRepository } from 'typeorm';

import User from '../models/User';
import AppError from '../errors/AppError';

interface ServiceRequest {
  fullName: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    fullName,
    email,
    password,
  }: ServiceRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const findByMail = await usersRepository.findOne({
      where: { email },
    });

    if (findByMail) {
      throw new AppError(
        'There is another account with the same email address.',
        400,
      );
    }

    const hashPassword = await hash(password, 8);

    const user = usersRepository.create({
      fullName,
      email,
      password: hashPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
