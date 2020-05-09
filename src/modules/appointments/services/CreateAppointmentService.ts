import AppError from '../../../shared/errors/AppError';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';
import IAppointment from '../entities/IAppointment';

interface IServiceRequest {
  consumerId: string;
  providerId: string;
  startDate: Date;
  endDate: Date;
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({
    consumerId,
    providerId,
    startDate,
    endDate,
  }: IServiceRequest): Promise<IAppointment> {
    const findClash = await this.appointmentsRepository.findClash({
      providerId,
      startDate,
      endDate,
    });

    if (findClash) {
      throw new AppError('There is a conflict with another appointment.', 400);
    }

    const appointment = await this.appointmentsRepository.create({
      consumerId,
      providerId,
      startDate,
      endDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
