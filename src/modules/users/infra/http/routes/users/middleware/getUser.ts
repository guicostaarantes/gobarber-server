import { Request, Response } from 'express';

import { getRepository } from 'typeorm';

import User from '../../../../database/entities/User';

export default async (req: Request, res: Response): Promise<void> => {
  let { id } = req.params;
  if (id === 'me') {
    id = req.tokenUserId;
  }
  const usersRepository = getRepository(User);
  const user = await usersRepository.findOne({ where: { id } });
  res.status(200).send(user);
};
