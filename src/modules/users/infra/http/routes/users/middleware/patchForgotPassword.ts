import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateUserPasswordService from '../../../../../services/UpdateUserPasswordService';

export default async (req: Request, res: Response): Promise<void> => {
  const { token, newPassword } = req.body;

  const service = container.resolve(UpdateUserPasswordService);

  await service.execute({
    token,
    newPassword,
  });

  res.status(204).send();
};
