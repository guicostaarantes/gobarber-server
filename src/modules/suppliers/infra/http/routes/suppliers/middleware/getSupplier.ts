import { Request, Response } from 'express';

import SuppliersRepository from '../../../../database/repositories/SuppliersRepository';

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const suppliersRepository = new SuppliersRepository();
  let supplier;
  if (id === 'me') {
    supplier = await suppliersRepository.findByUserId(req.tokenUserId, []);
  } else {
    supplier = await suppliersRepository.findById(id, [
      'id',
      'latitude',
      'longitude',
    ]);
  }
  res.status(200).send(supplier);
};
