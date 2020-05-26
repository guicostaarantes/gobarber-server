import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { isValid } from 'date-fns';

import IVacancy from '../entities/IVacancy';
import { IVacanciesRepository } from '../repositories/IVacanciesRepository';
import AppError from '../../../shared/errors/AppError';

interface IServiceRequest {
  supplierId: string;
  startDate: Date;
  endDate: Date;
}

@injectable()
class ListVacanciesOfSupplierService {
  constructor(
    @inject('VacanciesRepository')
    private vacanciesRepository: IVacanciesRepository,
  ) {}

  public async execute({
    supplierId,
    startDate,
    endDate,
  }: IServiceRequest): Promise<IVacancy[]> {
    const _startDate = isValid(startDate) ? startDate : new Date();

    if (endDate <= _startDate) {
      throw new AppError('End date cannot be earlier than start date.', 400);
    }

    if (startDate && startDate <= new Date()) {
      throw new AppError('Cannot list vacancies in the past.', 400);
    }

    const vacancies = await this.vacanciesRepository.findBySupplierId({
      supplierId,
      startDate: _startDate,
      endDate,
    });

    return vacancies;
  }
}

export default ListVacanciesOfSupplierService;
