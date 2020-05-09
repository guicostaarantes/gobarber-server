import { Request, Response } from 'express';

import UsersRepository from '../../../../database/repositories/UsersRepository';

export default async (req: Request, res: Response): Promise<void> => {
  const { page = 1 } = req.query;
  const usersRepository = new UsersRepository();
  const users = await usersRepository.find(+page, ['id', 'fullName', 'avatar']);
  res.status(200).send(users);
};
