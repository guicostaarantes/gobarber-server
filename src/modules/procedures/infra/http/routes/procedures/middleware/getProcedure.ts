import { Request, Response } from 'express';
import ProceduresRepository from '../../../../database/repositories/ProceduresRepository';

export default async (req: Request, res: Response): Promise<void> => {
  const { procedureId } = req.params;

  const proceduresRepository = new ProceduresRepository();

  const procedure = await proceduresRepository.findById(procedureId);

  res.status(200).send(procedure);
};
