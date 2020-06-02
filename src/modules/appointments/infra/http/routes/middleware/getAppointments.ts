import { Request, Response } from 'express';

import AppointmentsRepository from '../../../database/repositories/AppointmentsRepository';

export default async (req: Request, res: Response): Promise<void> => {
  const customerId = req.tokenUserId;
  const appointmentsRepository = new AppointmentsRepository();
  const appointments = await appointmentsRepository.findByCustomerId(
    customerId,
  );
  res.status(200).send(appointments);
};
