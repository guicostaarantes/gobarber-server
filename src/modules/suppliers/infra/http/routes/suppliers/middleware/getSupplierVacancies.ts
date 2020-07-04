import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListVacanciesOfSupplierService from '../../../../../services/ListVacanciesOfSupplierService';

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { startDate, endDate } = req.query as {
    startDate: string;
    endDate: string;
  };

  const service = container.resolve(ListVacanciesOfSupplierService);

  const vacancies = await service.execute({
    supplierId: id,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  });

  res.status(200).send(vacancies);
};
