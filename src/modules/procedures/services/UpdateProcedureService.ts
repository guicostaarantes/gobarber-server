import { injectable, inject } from 'tsyringe';

import { ISuppliersRepository } from '../../suppliers/repositories/ISuppliersRepository';
import { IProceduresRepository } from '../repositories/IProceduresRepository';
import IProcedure from '../entities/IProcedure';
import AppError from '../../../shared/errors/AppError';

interface IServiceRequest {
  userId: string;
  id: string;
  name?: string;
  duration?: number;
  price?: number;
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

    if (changingFields.name) {
      const proceduresOfSupplier = await this.proceduresRepository.findBySupplierId(
        supplier.id,
      );

      const nameClash = proceduresOfSupplier.find(
        proc => proc.name === changingFields.name,
      );

      if (nameClash) {
        throw new AppError('Procedure with same name already exists.', 409);
      }
    }

    if (procedureToUpdate.supplierId !== supplier.id) {
      throw new AppError('Cannot update procedure of other supplier.', 401);
    }

    const updatedProcedure = { ...procedureToUpdate, ...changingFields };

    await this.proceduresRepository.update(updatedProcedure);

    return updatedProcedure;
  }
}

export default UpdateProcedureService;
