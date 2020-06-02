import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '../../../../services/CreateAppointmentService';

export default async (req: Request, res: Response): Promise<void> => {
  const customerId = req.tokenUserId;
  const { procedureId } = req.body;
  let { startDate } = req.body;
  startDate = parseISO(startDate);

  const service = container.resolve(CreateAppointmentService);

  const appointment = await service.execute({
    customerId,
    procedureId,
    startDate,
  });

  res.status(200).send(appointment);
};
