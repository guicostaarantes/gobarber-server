import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface ServiceRequest {
  consumerId: string;
  providerId: string;
  startDate: Date;
  endDate: Date;
}

class CreateAppointmentService {
  public async execute({
    consumerId,
    providerId,
    startDate,
    endDate,
  }: ServiceRequest): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const findClash = await appointmentsRepository.findClash({
      providerId,
      startDate,
      endDate,
    });

    if (findClash) {
      throw new AppError('There is a conflict with another appointment.', 400);
    }

    const appointment = appointmentsRepository.create({
      consumerId,
      providerId,
      startDate,
      endDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
