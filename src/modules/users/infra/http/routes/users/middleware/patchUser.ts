import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UpdateUserProfileService from '../../../../../services/UpdateUserProfileService';

export default async (req: Request, res: Response): Promise<void> => {
  const service = container.resolve(UpdateUserProfileService);
  const user = await service.execute({
    userId: req.tokenUserId,
    ...req.body,
  });
  res.status(200).send(user);
};
