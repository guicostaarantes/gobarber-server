import { Request, Response } from 'express';

import UsersRepository from '../../../../database/repositories/UsersRepository';
import IUser from '../../../../../entities/IUser';

export default async (req: Request, res: Response): Promise<void> => {
  let { id } = req.params;
  let fields = ['id', 'fullName', 'avatar'] as (keyof IUser)[];
  if (id === 'me') {
    id = req.tokenUserId;
    fields = [];
  }
  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id, fields);
  res.status(200).send(user);
};
