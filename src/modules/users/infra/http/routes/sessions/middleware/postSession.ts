import { Request, Response } from 'express';

import AuthenticateUserService from '../../../../../services/AuthenticateUserService';
import UsersRepository from '../../../../database/repositories/UsersRepository';

export default async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const usersRepository = new UsersRepository();
  const service = new AuthenticateUserService(usersRepository);

  const token = await service.execute({
    email,
    password,
  });

  res.status(200).send({ token });
};
