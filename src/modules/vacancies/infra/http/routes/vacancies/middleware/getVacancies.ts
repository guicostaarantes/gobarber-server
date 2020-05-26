import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import ListVacanciesOfSupplierService from '../../../../../services/ListVacanciesOfSupplierService';

export default async (req: Request, res: Response): Promise<void> => {
  const { supplierId } = req.params;
  let { startDate, endDate } = req.body;

  startDate = parseISO(startDate);
  endDate = parseISO(endDate);

  const service = container.resolve(ListVacanciesOfSupplierService);

  const vacancies = await service.execute({
    supplierId,
    startDate,
    endDate,
  });

  res.status(200).send(vacancies);
};
