import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { add } from 'date-fns';
import AppError from '../../../shared/errors/AppError';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';
import { IProceduresRepository } from '../../procedures/repositories/IProceduresRepository';
import { IVacanciesRepository } from '../../vacancies/repositories/IVacanciesRepository';
import IAppointment from '../entities/IAppointment';

interface IServiceRequest {
  customerId: string;
  procedureId: string;
  startDate: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('ProceduresRepository')
    private proceduresRepository: IProceduresRepository,
    @inject('VacanciesRepository')
    private vacanciesRepository: IVacanciesRepository,
  ) {}

  public async execute({
    customerId,
    procedureId,
    startDate,
  }: IServiceRequest): Promise<IAppointment> {
    const procedure = await this.proceduresRepository.findById(procedureId);

    if (!procedure) {
      throw new AppError('Procedure not found.', 404);
    }

    if (startDate < new Date()) {
      throw new AppError('Cannot create appointments in the past.', 400);
    }

    const { supplierId, price } = procedure;

    const endDate = add(startDate, { minutes: procedure.duration });

    const findVacancy = await this.vacanciesRepository.findBySupplierId({
      supplierId,
      startDate,
      endDate,
    });

    if (
      findVacancy.length !== 1 ||
      findVacancy[0].startDate > startDate ||
      findVacancy[0].endDate < endDate
    ) {
      throw new AppError('There is no vacancy for this appointment.', 400);
    }

    const findClash = await this.appointmentsRepository.findBySupplierId({
      supplierId,
      startDate,
      endDate,
    });

    if (findClash.length) {
      throw new AppError('There is a conflict with another appointment.', 400);
    }

    const appointment = await this.appointmentsRepository.create({
      customerId,
      supplierId,
      procedureId,
      price,
      startDate,
      endDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
