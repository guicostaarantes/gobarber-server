import { getCustomRepository } from 'typeorm';

import Appointment from '../infra/database/entities/Appointment';
import AppointmentsRepository from '../infra/database/repositories/AppointmentsRepository';
import AppError from '../../../shared/errors/AppError';

interface IServiceRequest {
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
  }: IServiceRequest): Promise<Appointment> {
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
