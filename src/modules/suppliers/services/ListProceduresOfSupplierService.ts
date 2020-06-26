import { injectable, inject } from 'tsyringe';

import { ISuppliersRepository } from '../repositories/ISuppliersRepository';
import { IProceduresRepository } from '../../procedures/repositories/IProceduresRepository';
import IProcedure from '../../procedures/entities/IProcedure';
import AppError from '../../../shared/errors/AppError';

@injectable()
class ListProceduresOfSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
    @inject('ProceduresRepository')
    private proceduresRepository: IProceduresRepository,
  ) {}

  public async execute(supplierId: string): Promise<IProcedure[]> {
    const supplier = await this.suppliersRepository.findById(supplierId, [
      'id',
    ]);

    if (!supplier) {
      throw new AppError('Supplier not found.', 404);
    }

    const procedures = await this.proceduresRepository.findBySupplierId(
      supplierId,
    );

    return procedures;
  }
}

export default ListProceduresOfSupplierService;
