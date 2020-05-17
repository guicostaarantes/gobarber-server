import { container } from 'tsyringe';
import { Request, Response } from 'express';

import DeleteSupplierService from '../../../../../services/DeleteSupplierService';

export default async (req: Request, res: Response): Promise<void> => {
  const userId = req.tokenUserId;
  const service = container.resolve(DeleteSupplierService);
  await service.execute(userId);
  res.status(204).send();
};
