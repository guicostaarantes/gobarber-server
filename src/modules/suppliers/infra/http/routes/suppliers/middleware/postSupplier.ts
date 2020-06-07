import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateSupplierService from '../../../../../services/CreateSupplierService';

export default async (req: Request, res: Response): Promise<void> => {
  const userId = req.tokenUserId;
  const { name, latitude, longitude } = req.body;

  const service = container.resolve(CreateSupplierService);

  const supplier = await service.execute({
    userId,
    name,
    latitude: +latitude,
    longitude: +longitude,
  });

  res.status(200).send(supplier);
};
