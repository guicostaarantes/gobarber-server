import { Request, Response } from 'express';

import SuppliersRepository from '../../../../database/repositories/SuppliersRepository';
import ISupplier from '../../../../../entities/ISupplier';

export default async (req: Request, res: Response): Promise<void> => {
  const { page = 1, position, fields } = req.query;
  const [latitude, longitude] = (position as string).split(',');
  const fieldsArray = (fields as string).split(',') as (keyof ISupplier)[];
  const suppliersRepository = new SuppliersRepository();
  const suppliers = await suppliersRepository.findByNearestLocation(
    +page,
    +latitude,
    +longitude,
    fieldsArray,
  );
  res.status(200).send(suppliers);
};
