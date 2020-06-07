import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListAppointmentsService from '../../../../services/ListAppointmentsService';

export default async (req: Request, res: Response): Promise<void> => {
  const customerId = req.tokenUserId;

  const service = container.resolve(ListAppointmentsService);

  const appointments = await service.execute({
    customerId,
  });

  res.status(200).send(appointments);
};
