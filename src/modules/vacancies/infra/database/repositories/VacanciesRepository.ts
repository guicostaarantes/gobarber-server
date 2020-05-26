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
      .where('supplier_id = :supplierId', { supplierId })
      .andWhere('NOT (end_date < :startDate OR :endDate < start_date)', {
        startDate,
        endDate,
      })
      .getMany();

    return vacancies;
  }
}
export default VacanciesRepository;
