import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProceduresOfSupplierService from '../../../../../services/ListProceduresOfSupplierService';
import SuppliersRepository from '../../../../database/repositories/SuppliersRepository';

export default async (req: Request, res: Response): Promise<void> => {
  const suppliersRepository = new SuppliersRepository();

  const { id } = await suppliersRepository.findByUserId(req.tokenUserId, []);

  const service = container.resolve(ListProceduresOfSupplierService);

  const procedures = await service.execute(id);

  res.status(200).send(procedures);
};
