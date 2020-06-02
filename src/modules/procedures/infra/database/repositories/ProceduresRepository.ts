import { Repository, getRepository } from 'typeorm';
import {
  IProceduresRepository,
  ICreateProcedureDTO,
} from '../../../repositories/IProceduresRepository';
import Procedure from '../entities/Procedure';

class ProceduresRepository implements IProceduresRepository {
  baseRepository: Repository<Procedure>;

  constructor() {
    this.baseRepository = getRepository(Procedure);
  }

  public async create({
    supplierId,
    name,
    duration,
    price,
  }: ICreateProcedureDTO): Promise<Procedure> {
    const newProcedure = this.baseRepository.create({
      supplierId,
      name,
      duration,
      price,
    });

    const procedure = await this.baseRepository.save(newProcedure);

    return procedure;
  }

  public async update(procedure: Procedure): Promise<Procedure> {
    await this.baseRepository.save(procedure);
    return procedure;
  }

  public async delete(id: string): Promise<void> {
    await this.baseRepository.softDelete({ id });
  }

  public async findById(id: string): Promise<Procedure> {
    const procedure = await this.baseRepository.findOne({ id });

    return procedure;
  }

  public async findBySupplierId(supplierId: string): Promise<Procedure[]> {
    const procedures = await this.baseRepository.find({ supplierId });

    return procedures;
  }
}

export default ProceduresRepository;
