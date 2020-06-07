import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IAppointmentsRepository } from '../../appointments/repositories/IAppointmentsRepository';
import { ISuppliersRepository } from '../repositories/ISuppliersRepository';
import IAppointment from '../../appointments/entities/IAppointment';

interface IServiceRequest {
  userId: string;
  supplierId: string;
  startDate: Date;
  endDate: Date;
}

@injectable()
class ListAppointmentOfSupplierService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute({
    userId,
    supplierId,
    startDate,
    endDate,
  }: IServiceRequest): Promise<IAppointment[]> {
    const supplier = await this.suppliersRepository.findByUserId(userId, [
      'id',
    ]);

    let appointments = await this.appointmentsRepository.findBySupplierId({
      supplierId,
      startDate,
      endDate,
    });

    if (!supplier || supplier.id !== supplierId) {
      appointments = appointments.map(appointment => {
        const newAppointment = { ...appointment };
        delete newAppointment.id;
        delete newAppointment.customerId;
        delete newAppointment.procedureId;
        delete newAppointment.price;
        delete newAppointment.createdAt;
        delete newAppointment.updatedAt;
        delete newAppointment.deletedAt;
        return newAppointment;
      });
    }

    return appointments;
  }
}

export default ListAppointmentOfSupplierService;
