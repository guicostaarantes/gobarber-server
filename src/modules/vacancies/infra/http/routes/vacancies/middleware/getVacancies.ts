import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import ListVacanciesOfSupplierService from '../../../../../services/ListVacanciesOfSupplierService';

export default async (req: Request, res: Response): Promise<void> => {
  const { supplierId } = req.params;
  const { start_date, end_date } = req.query as {
    start_date: string;
    end_date: string;
  };

  const startDate = parseISO(start_date);
  const endDate = parseISO(end_date);

  const service = container.resolve(ListVacanciesOfSupplierService);

  const vacancies = await service.execute({
    supplierId,
    startDate,
    endDate,
  });

  res.status(200).send(vacancies);
};
