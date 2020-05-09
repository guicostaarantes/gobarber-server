import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UpdateUserAvatarService from '../../../../../services/UpdateUserAvatarService';

export default async (req: Request, res: Response): Promise<void> => {
  const service = container.resolve(UpdateUserAvatarService);
  const user = await service.execute({
    userId: req.tokenUserId,
    avatarFilename: req.file.filename,
  });
  res.status(200).send(user);
};
