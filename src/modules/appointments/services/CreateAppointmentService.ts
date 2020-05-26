import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';
import IAppointment from '../entities/IAppointment';

interface IServiceRequest {
  consumerId: string;
  supplierId: string;
  startDate: Date;
  endDate: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    consumerId,
    supplierId,
    startDate,
    endDate,
  }: IServiceRequest): Promise<IAppointment> {
    const findClash = await this.appointmentsRepository.findBySupplierId({
      supplierId,
      startDate,
      endDate,
    });

    if (findClash.length) {
      throw new AppError('There is a conflict with another appointment.', 400);
    }

    const appointment = await this.appointmentsRepository.create({
      consumerId,
      supplierId,
      startDate,
      endDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
