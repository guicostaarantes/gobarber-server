import { injectable, inject } from 'tsyringe';

import { ISuppliersRepository } from '../../suppliers/repositories/ISuppliersRepository';
import { IProceduresRepository } from '../repositories/IProceduresRepository';
import AppError from '../../../shared/errors/AppError';

interface IServiceRequest {
  userId: string;
  id: string;
}

@injectable()
class RemoveProcedureService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
    @inject('ProceduresRepository')
    private proceduresRepository: IProceduresRepository,
  ) {}

  public async execute({ userId, id }: IServiceRequest): Promise<void> {
    const supplier = await this.suppliersRepository.findByUserId(userId, [
      'id',
    ]);

    if (!supplier) {
      throw new AppError('User is not a supplier.', 400);
    }

    const procedureToDelete = await this.proceduresRepository.findById(id);

    if (!procedureToDelete) {
      throw new AppError('Procedure not found.', 404);
    }

    if (procedureToDelete.supplierId !== supplier.id) {
      throw new AppError('Cannot remove procedure of other supplier.', 401);
    }

    await this.proceduresRepository.delete(id);
  }
}

export default RemoveProcedureService;
