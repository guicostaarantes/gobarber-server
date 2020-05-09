import { Request, Response } from 'express';

import { getRepository } from 'typeorm';

import User from '../../../../database/entities/User';

export default async (req: Request, res: Response): Promise<void> => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();
  res.status(200).send(users);
};
