import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateProcedureService from '../../../../../services/CreateProcedureService';

export default async (req: Request, res: Response): Promise<void> => {
  const { name, duration, price } = req.body;

  const service = container.resolve(CreateProcedureService);

  const procedure = await service.execute({
    userId: req.tokenUserId,
    name,
    duration,
    price,
  });

  res.status(200).send(procedure);
};
