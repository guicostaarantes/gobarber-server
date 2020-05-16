import { Request, Response } from 'express';

import SuppliersRepository from '../../../../database/repositories/SuppliersRepository';

export default async (req: Request, res: Response): Promise<void> => {
  let { id } = req.params;
  if (id === 'me') {
    id = req.tokenUserId;
  }
  const suppliersRepository = new SuppliersRepository();
  const supplier = await suppliersRepository.findByUserId(id, ['id']);
  res.status(200).send(supplier);
};
