import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import ListAppointmentOfSupplierService from '../../../../../services/ListAppointmentsOfSupplierService';

export default async (req: Request, res: Response): Promise<void> => {
  const userId = req.tokenUserId;

  const { id: supplierId } = req.params;

  const { start_date, end_date } = req.query as {
    start_date: string;
    end_date: string;
  };

  const startDate = parseISO(start_date);
  const endDate = parseISO(end_date);

  const service = container.resolve(ListAppointmentOfSupplierService);

  const appointments = await service.execute({
    userId,
    supplierId,
    startDate,
    endDate,
  });

  res.status(200).send(appointments);
};
