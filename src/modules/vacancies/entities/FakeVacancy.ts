import IVacancy from './IVacancy';

class FakeVacancy implements IVacancy {
  id: string;

  supplierId: string;

  startDate: Date;

  endDate: Date;
}

export default FakeVacancy;
