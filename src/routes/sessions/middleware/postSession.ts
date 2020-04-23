import { Request, Response } from 'express';

import AuthenticateUserService from '../../../services/AuthenticateUserService';

export default async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const service = new AuthenticateUserService();

  const token = await service.execute({
    email,
    password,
  });

  res.status(200).send({ token });
};
