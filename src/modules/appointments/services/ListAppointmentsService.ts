import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';
import IAppointment from '../entities/IAppointment';

interface IServiceRequest {
  customerId: string;
}

@injectable()
class ListAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    customerId,
  }: IServiceRequest): Promise<IAppointment[]> {
    const appointments = await this.appointmentsRepository.findByCustomerId(
      customerId,
    );

    return appointments;
  }
}

export default ListAppointmentService;
