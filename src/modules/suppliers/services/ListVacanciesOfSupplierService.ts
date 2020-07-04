import { injectable, inject } from 'tsyringe';

import { ISuppliersRepository } from '../repositories/ISuppliersRepository';
import { IVacanciesRepository } from '../../vacancies/repositories/IVacanciesRepository';
import IVacancy from '../../vacancies/entities/IVacancy';
import AppError from '../../../shared/errors/AppError';

interface IServiceRequest {
  supplierId: string;
  startDate: Date;
  endDate: Date;
}

@injectable()
class ListVacanciesOfSupplierService {
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
    const supplier = await this.suppliersRepository.findById(supplierId, [
      'id',
    ]);

    if (!supplier) {
      throw new AppError('Supplier not found.', 404);
    }

    const vacancies = await this.vacanciesRepository.findBySupplierId({
      supplierId,
      startDate,
      endDate,
    });

    return vacancies;
  }
}

export default ListVacanciesOfSupplierService;
