import { Request, Response } from 'express';

import SuppliersRepository from '../../../../database/repositories/SuppliersRepository';
import ISupplier from '../../../../../entities/ISupplier';

export default async (req: Request, res: Response): Promise<void> => {
  const { page = '1', position, tolerance = '0.2', fields } = req.query;
  const [latitude, longitude] = (position as string).split(',');
  const fieldsArray = fields
    ? ((fields as string).split(',') as (keyof ISupplier)[])
    : [];
  const suppliersRepository = new SuppliersRepository();
  const suppliers = await suppliersRepository.findByNearestLocation(
    +page,
    +latitude,
    +longitude,
    +tolerance,
    fieldsArray,
  );
  res.status(200).send(suppliers);
};
