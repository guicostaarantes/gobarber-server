import { Request, Response } from 'express';

import CreateUserService from '../../../services/CreateUserService';

export default async (req: Request, res: Response): Promise<void> => {
  const { fullName, email, password } = req.body;

  const service = new CreateUserService();

  const user = await service.execute({
    fullName,
    email,
    password,
  });

  delete user.password;

  res.status(200).send(user);
};
