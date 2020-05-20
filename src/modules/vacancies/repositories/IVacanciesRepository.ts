import IVacancy from '../entities/IVacancy';

export interface ICreateVacancyDTO {
  supplierId: string;
  startDate: Date;
  endDate: Date;
}

export interface IFindVacancyDTO {
  supplierId: string;
  startDate: Date;
  endDate: Date;
}

export interface IVacanciesRepository {
  create(dto: ICreateVacancyDTO): Promise<IVacancy>;
  delete(id: string): Promise<void>;
  findBySupplierId(dto: IFindVacancyDTO): Promise<IVacancy[]>;
}
