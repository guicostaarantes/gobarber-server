import {
  IVacanciesRepository,
  ICreateVacancyDTO,
  IFindVacancyDTO,
} from './IVacanciesRepository';
import FakeVacancy from '../entities/FakeVacancy';

class FakeVacanciesRepository implements IVacanciesRepository {
  public table: FakeVacancy[];

  constructor() {
    this.table = [];
  }

  public async create({
    supplierId,
    startDate,
    endDate,
  }: ICreateVacancyDTO): Promise<FakeVacancy> {
    const vacancy = new FakeVacancy();

    vacancy.supplierId = supplierId;
    vacancy.startDate = startDate;
    vacancy.endDate = endDate;

    this.table.push(vacancy);

    return vacancy;
  }

  public async delete(id: string): Promise<void> {
    const vacancyIndex = this.table.findIndex(
      findVacancy => findVacancy.id === id,
    );

    this.table.splice(vacancyIndex, 1);
  }

  public async findBySupplierId({
    supplierId,
    startDate,
    endDate,
  }: IFindVacancyDTO): Promise<FakeVacancy[]> {
    return this.table.filter(vacancy => {
      return (
        vacancy.supplierId === supplierId &&
        ((startDate >= vacancy.startDate && startDate <= vacancy.endDate) ||
          (endDate >= vacancy.startDate && endDate <= vacancy.endDate))
      );
    });
  }
}
export default FakeVacanciesRepository;
