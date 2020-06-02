import { injectable, inject } from 'tsyringe';

import { IProceduresRepository } from '../repositories/IProceduresRepository';
import IProcedure from '../entities/IProcedure';

@injectable()
class ListProceduresOfSupplierService {
  constructor(
    @inject('ProceduresRepository')
    private proceduresRepository: IProceduresRepository,
  ) {}

  public async execute(supplierId: string): Promise<IProcedure[]> {
    const procedures = await this.proceduresRepository.findBySupplierId(
      supplierId,
    );

    return procedures;
  }
}

export default ListProceduresOfSupplierService;
