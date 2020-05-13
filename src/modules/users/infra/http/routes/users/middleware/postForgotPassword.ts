import { container } from 'tsyringe';
import { Request, Response } from 'express';

import SendForgotPasswordEmailService from '../../../../../services/SendForgotPasswordEmailService';

export default async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  const service = container.resolve(SendForgotPasswordEmailService);

  await service.execute({
    email,
  });

  res.status(204).send();
};
