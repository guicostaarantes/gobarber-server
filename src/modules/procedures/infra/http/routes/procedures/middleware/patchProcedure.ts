import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateProcedureService from '../../../../../services/UpdateProcedureService';

export default async (req: Request, res: Response): Promise<void> => {
  const { procedureId } = req.params;

  const service = container.resolve(UpdateProcedureService);

  const procedure = await service.execute({
    userId: req.tokenUserId,
    id: procedureId,
    ...req.body,
  });

  res.status(200).send(procedure);
};
