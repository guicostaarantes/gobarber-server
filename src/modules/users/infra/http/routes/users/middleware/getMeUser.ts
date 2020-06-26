import { Request, Response } from 'express';

import UsersRepository from '../../../../database/repositories/UsersRepository';

export default async (req: Request, res: Response): Promise<void> => {
  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(req.tokenUserId, []);

  res.status(200).send(user);
};
