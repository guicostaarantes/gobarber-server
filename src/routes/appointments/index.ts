import { Router } from 'express';

import { getCustomRepository } from 'typeorm';

import { parseISO } from 'date-fns';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

import AppointmentsRepository from '../../repositories/AppointmentsRepository';

import CreateAppointmentService from '../../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req, res) => {
  const consumerId = req.tokenUserId;
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find({
    where: { consumerId },
  });
  res.status(200).send(appointments);
});

appointmentsRouter.post('/', ensureAuthenticated, async (req, res) => {
  const consumerId = req.tokenUserId;
  const { providerId } = req.body;
  let { startDate, endDate } = req.body;
  startDate = parseISO(startDate);
  endDate = parseISO(endDate);

  const service = new CreateAppointmentService();

  const appointment = await service.execute({
    consumerId,
    providerId,
    startDate,
    endDate,
  });

  res.status(200).send(appointment);
});

// appointmentsRouter.patch('/:id', async (req, res) => {});

// appointmentsRouter.delete('/:id', async (req, res) => {});

export default appointmentsRouter;
