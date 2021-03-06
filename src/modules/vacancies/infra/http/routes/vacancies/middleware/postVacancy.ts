import { container } from 'tsyringe';
import { Request, Response } from 'express';

import SuppliersRepository from '../../../../../../suppliers/infra/database/repositories/SuppliersRepository';
import CreateVacancyService from '../../../../../services/CreateVacancyService';

export default async (req: Request, res: Response): Promise<void> => {
  const { startDate, endDate } = req.body;

  const suppliersRepository = new SuppliersRepository();

  const service = container.resolve(CreateVacancyService);

  const { id } = await suppliersRepository.findByUserId(req.tokenUserId, [
    'id',
  ]);

  const vacancy = await service.execute({
    supplierId: id,
    startDate,
    endDate,
  });

  res.status(200).send(vacancy);
};
