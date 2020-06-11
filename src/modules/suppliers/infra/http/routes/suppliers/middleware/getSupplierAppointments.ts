import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListAppointmentOfSupplierService from '../../../../../services/ListAppointmentsOfSupplierService';

export default async (req: Request, res: Response): Promise<void> => {
  const userId = req.tokenUserId;

  const { id: supplierId } = req.params;

  const { startDate, endDate } = req.query as {
    startDate: string;
    endDate: string;
  };

  const service = container.resolve(ListAppointmentOfSupplierService);

  const appointments = await service.execute({
    userId,
    supplierId,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  });

  res.status(200).send(appointments);
};
