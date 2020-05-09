import { Request, Response } from 'express';

import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../../../database/repositories/AppointmentsRepository';

export default async (req: Request, res: Response): Promise<void> => {
  const consumerId = req.tokenUserId;
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find({
    where: { consumerId },
  });
  res.status(200).send(appointments);
};
