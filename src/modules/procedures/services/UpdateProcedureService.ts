import { injectable, inject } from 'tsyringe';

import { ISuppliersRepository } from '../../suppliers/repositories/ISuppliersRepository';
import { IProceduresRepository } from '../repositories/IProceduresRepository';
import IProcedure from '../entities/IProcedure';
import AppError from '../../../shared/errors/AppError';

interface IServiceRequest {
  userId: string;
  id: string;
  name: string;
  duration: number;
  price: number;
}

@injectable()
class UpdateProcedureService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
    @inject('ProceduresRepository')
    private proceduresRepository: IProceduresRepository,
  ) {}

  public async execute({
    userId,
    id,
    ...changingFields
  }: IServiceRequest): Promise<IProcedure> {
    const supplier = await this.suppliersRepository.findByUserId(userId, [
      'id',
    ]);

    if (!supplier) {
      throw new AppError('User is not a supplier.', 400);
    }

    const procedureToUpdate = await this.proceduresRepository.findById(id);

    if (!procedureToUpdate) {
      throw new AppError('Procedure not found.', 404);
    }

    const updatedProcedure = { ...procedureToUpdate, ...changingFields };

    await this.proceduresRepository.update(updatedProcedure);

    return updatedProcedure;
  }
}

export default UpdateProcedureService;
