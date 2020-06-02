import { container } from 'tsyringe';
import { Request, Response } from 'express';

import RemoveProcedureService from '../../../../../services/RemoveProcedureService';

export default async (req: Request, res: Response): Promise<void> => {
  const { procedureId } = req.params;

  const service = container.resolve(RemoveProcedureService);

  await service.execute({
    userId: req.tokenUserId,
    id: procedureId,
  });

  res.status(204).send();
};
