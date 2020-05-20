import { Repository, getRepository } from 'typeorm';
import {
  IVacanciesRepository,
  ICreateVacancyDTO,
  IFindVacancyDTO,
} from '../../../repositories/IVacanciesRepository';
import Vacancy from '../entities/Vacancy';

class VacanciesRepository implements IVacanciesRepository {
  baseRepository: Repository<Vacancy>;

  constructor() {
    this.baseRepository = getRepository(Vacancy);
  }

  public async create({
    supplierId,
    startDate,
    endDate,
  }: ICreateVacancyDTO): Promise<Vacancy> {
    const newVacancy = this.baseRepository.create({
      supplierId,
      startDate,
      endDate,
    });

    const vacancy = await this.baseRepository.save(newVacancy);

    return vacancy;
  }

  public async delete(id: string): Promise<void> {
    await this.baseRepository.delete(id);
  }

  public async findBySupplierId({
    supplierId,
    startDate,
    endDate,
  }: IFindVacancyDTO): Promise<Vacancy[]> {
    const vacancies = await this.baseRepository
      .createQueryBuilder()
      .where('(:startDate >= start_date AND :startDate <= end_date)', {
        startDate,
      })
      .orWhere('(:endDate >= start_date AND :endDate <= end_date)', {
        endDate,
      })
      .andWhere('supplier_id = :sid', { sid: supplierId })
      .getMany();

    return vacancies;
  }
}
export default VacanciesRepository;
