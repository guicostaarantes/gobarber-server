import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProceduresOfSupplierService from '../../../../../services/ListProceduresOfSupplierService';

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const service = container.resolve(ListProceduresOfSupplierService);

  const procedures = await service.execute(id);

  res.status(200).send(procedures);
};
