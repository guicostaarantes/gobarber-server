import { Request, Response } from 'express';

import UsersRepository from '../../../../database/repositories/UsersRepository';

export default async (req: Request, res: Response): Promise<void> => {
  let { id } = req.params;
  if (id === 'me') {
    id = req.tokenUserId;
  }
  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id, ['id']);
  res.status(200).send(user);
};
