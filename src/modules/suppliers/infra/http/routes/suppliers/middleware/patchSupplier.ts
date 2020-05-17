import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateSupplierService from '../../../../../services/UpdateSupplierService';

export default async (req: Request, res: Response): Promise<void> => {
  const userId = req.tokenUserId;
  const service = container.resolve(UpdateSupplierService);
  const supplier = await service.execute({
    userId,
    ...req.body,
  });
  res.status(200).send(supplier);
};
