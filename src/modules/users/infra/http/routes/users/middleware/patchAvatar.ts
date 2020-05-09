import { Request, Response } from 'express';
import UpdateUserAvatarService from '../../../../../services/UpdateUserAvatarService';
import UsersRepository from '../../../../database/repositories/UsersRepository';

export default async (req: Request, res: Response): Promise<void> => {
  const usersRepository = new UsersRepository();
  const service = new UpdateUserAvatarService(usersRepository);
  const user = await service.execute({
    userId: req.tokenUserId,
    avatarFilename: req.file.filename,
  });
  res.status(200).send(user);
};
