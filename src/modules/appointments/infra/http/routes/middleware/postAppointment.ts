import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '../../../../services/CreateAppointmentService';

export default async (req: Request, res: Response): Promise<void> => {
  const consumerId = req.tokenUserId;
  const { providerId } = req.body;
  let { startDate, endDate } = req.body;
  startDate = parseISO(startDate);
  endDate = parseISO(endDate);

  const service = container.resolve(CreateAppointmentService);

  const appointment = await service.execute({
    consumerId,
    providerId,
    startDate,
    endDate,
  });

  res.status(200).send(appointment);
};
