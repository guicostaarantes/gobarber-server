import { Request, Response } from 'express';

import SuppliersRepository from '../../../../database/repositories/SuppliersRepository';

export default async (req: Request, res: Response): Promise<void> => {
  const suppliersRepository = new SuppliersRepository();

  const supplier = await suppliersRepository.findByUserId(req.tokenUserId, []);

  res.status(200).send(supplier);
};
