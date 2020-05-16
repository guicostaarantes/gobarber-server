import { Request, Response } from 'express';

import SuppliersRepository from '../../../../database/repositories/SuppliersRepository';

export default async (req: Request, res: Response): Promise<void> => {
  const { page = 1, latitude, longitude } = req.query;
  const suppliersRepository = new SuppliersRepository();
  const suppliers = await suppliersRepository.findByNearestLocation(
    +page,
    +latitude,
    +longitude,
    [],
  );
  res.status(200).send(suppliers);
};
