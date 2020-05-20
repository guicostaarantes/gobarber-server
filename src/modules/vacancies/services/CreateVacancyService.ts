import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { min, max } from 'date-fns';

import IVacancy from '../entities/IVacancy';
import { ISuppliersRepository } from '../../suppliers/repositories/ISuppliersRepository';
import { IVacanciesRepository } from '../repositories/IVacanciesRepository';
import AppError from '../../../shared/errors/AppError';

interface IServiceRequest {
  supplierId: string;
  startDate: Date;
  endDate: Date;
}

@injectable()
class CreateVacancyService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
    @inject('VacanciesRepository')
    private vacanciesRepository: IVacanciesRepository,
  ) {}

  public async execute({
    supplierId,
    startDate,
    endDate,
  }: IServiceRequest): Promise<IVacancy> {
    if (endDate <= startDate) {
      throw new AppError('End date cannot be earlier than start date.', 400);
    }

    if (endDate <= new Date()) {
      throw new AppError('Cannot create a vacancy in the past.', 400);
    }

    const supplier = await this.suppliersRepository.findById(supplierId, []);

    if (!supplier) {
      throw new AppError('Supplier not found.', 404);
    }

    const clashes = await this.vacanciesRepository.findBySupplierId({
      supplierId,
      startDate,
      endDate,
    });

    let newVacancy;

    if (clashes.length) {
      const earliestStartDate = clashes.reduce(
        (earliest, clash) => min([clash.startDate, earliest]),
        startDate,
      );

      const latestEndDate = clashes.reduce(
        (latest, clash) => max([clash.endDate, latest]),
        endDate,
      );

      const deleteClashes = clashes.map(clash =>
        this.vacanciesRepository.delete(clash.id),
      );

      await Promise.all(deleteClashes);

      newVacancy = await this.vacanciesRepository.create({
        supplierId,
        startDate: earliestStartDate,
        endDate: latestEndDate,
      });
    } else {
      newVacancy = await this.vacanciesRepository.create({
        supplierId,
        startDate,
        endDate,
      });
    }
    return newVacancy;
  }
}

export default CreateVacancyService;
