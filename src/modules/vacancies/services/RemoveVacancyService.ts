import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

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
class RemoveVacancyService {
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
  }: IServiceRequest): Promise<IVacancy[]> {
    if (endDate <= startDate) {
      throw new AppError('End date cannot be earlier than start date.', 400);
    }

    if (endDate <= new Date()) {
      throw new AppError('Cannot remove a vacancy in the past.', 400);
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

    if (!clashes.length) {
      return [];
    }

    const deleteClashes = clashes.map(clash =>
      this.vacanciesRepository.delete(clash.id),
    );

    const createNewVacancies = clashes
      .map(clash => {
        let situation = 0;
        if (clash.startDate < startDate) {
          situation += 1;
        }
        if (clash.endDate > endDate) {
          situation += 2;
        }

        switch (situation) {
          case 1:
            return [
              this.vacanciesRepository.create({
                supplierId,
                startDate: clash.startDate,
                endDate: startDate,
              }),
            ];
          case 2:
            return [
              this.vacanciesRepository.create({
                supplierId,
                startDate: endDate,
                endDate: clash.endDate,
              }),
            ];
          case 3:
            return [
              this.vacanciesRepository.create({
                supplierId,
                startDate: clash.startDate,
                endDate: startDate,
              }),
              this.vacanciesRepository.create({
                supplierId,
                startDate: endDate,
                endDate: clash.endDate,
              }),
            ];
          default:
            return [];
        }
      })
      .reduce((acc, val) => [...acc, ...val], []);

    await Promise.all(deleteClashes);

    const newVacancies = await Promise.all(createNewVacancies);

    return newVacancies;
  }
}

export default RemoveVacancyService;
