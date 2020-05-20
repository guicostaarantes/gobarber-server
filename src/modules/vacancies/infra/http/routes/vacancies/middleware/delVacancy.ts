import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import SuppliersRepository from '../../../../../../suppliers/infra/database/repositories/SuppliersRepository';
import CreateAntiVacancyService from '../../../../../services/CreateAntiVacancyService';

export default async (req: Request, res: Response): Promise<void> => {
  let { startDate, endDate } = req.body;

  startDate = parseISO(startDate);
  endDate = parseISO(endDate);

  const suppliersRepository = new SuppliersRepository();

  const service = container.resolve(CreateAntiVacancyService);

  const { id } = await suppliersRepository.findByUserId(req.tokenUserId, [
    'id',
  ]);

  const vacancies = await service.execute({
    supplierId: id,
    startDate,
    endDate,
  });

  if (vacancies.length === 0) {
    res.status(204).send();
  } else if (vacancies.length === 1) {
    res.status(200).send(vacancies[0]);
  } else {
    res.status(200).send(vacancies);
  }
};
