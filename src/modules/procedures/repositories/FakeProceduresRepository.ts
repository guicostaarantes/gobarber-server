import {
  IProceduresRepository,
  ICreateProcedureDTO,
} from './IProceduresRepository';
import FakeProcedure from '../entities/FakeProcedure';

class FakeProceduresRepository implements IProceduresRepository {
  public table: FakeProcedure[];

  constructor() {
    this.table = [];
  }

  public async create({
    supplierId,
    name,
    duration,
    price,
  }: ICreateProcedureDTO): Promise<FakeProcedure> {
    const procedure = new FakeProcedure();

    procedure.supplierId = supplierId;
    procedure.name = name;
    procedure.duration = duration;
    procedure.price = price;

    this.table.push(procedure);

    return procedure;
  }

  public async update(procedure: FakeProcedure): Promise<FakeProcedure> {
    const procedureIndex = this.table.findIndex(
      findProcedure => findProcedure.id === procedure.id,
    );

    this.table[procedureIndex] = procedure;

    return procedure;
  }

  public async delete(id: string): Promise<void> {
    const procedureIndex = this.table.findIndex(
      findProcedure => findProcedure.id === id,
    );

    this.table.splice(procedureIndex, 1);
  }

  public async findById(id: string): Promise<FakeProcedure> {
    return this.table.find(procedure => procedure.id === id);
  }

  public async findBySupplierId(supplierId: string): Promise<FakeProcedure[]> {
    return this.table.filter(procedure => procedure.supplierId === supplierId);
  }
}
export default FakeProceduresRepository;
