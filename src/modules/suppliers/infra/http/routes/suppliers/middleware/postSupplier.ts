import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateSupplierService from '../../../../../services/CreateSupplierService';

export default async (req: Request, res: Response): Promise<void> => {
  const userId = req.tokenUserId;
  const { latitude, longitude } = req.body;

  const service = container.resolve(CreateSupplierService);

  const supplier = await service.execute({
    userId,
    latitude: +latitude,
    longitude: +longitude,
  });

  res.status(200).send(supplier);
};
