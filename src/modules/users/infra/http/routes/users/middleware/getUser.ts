import { Request, Response } from 'express';

import UsersRepository from '../../../../database/repositories/UsersRepository';
import IUser from '../../../../../entities/IUser';

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const fields = ['id', 'fullName', 'avatar'] as (keyof IUser)[];

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id, fields);

  res.status(200).send(user);
};
