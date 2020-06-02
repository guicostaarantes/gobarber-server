import { injectable, inject } from 'tsyringe';

import { ISuppliersRepository } from '../../suppliers/repositories/ISuppliersRepository';
import { IProceduresRepository } from '../repositories/IProceduresRepository';
import IProcedure from '../entities/IProcedure';
import AppError from '../../../shared/errors/AppError';

interface IServiceRequest {
  userId: string;
  name: string;
  duration: number;
  price: number;
}

@injectable()
class CreateProcedureService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
    @inject('ProceduresRepository')
    private proceduresRepository: IProceduresRepository,
  ) {}

  public async execute({
    userId,
    name,
    duration,
    price,
  }: IServiceRequest): Promise<IProcedure> {
    if (duration < 0) {
      throw new AppError('Duration cannot have a negative value.', 400);
    }

    if (price < 0) {
      throw new AppError('Price cannot have a negative value.', 400);
    }

    const supplier = await this.suppliersRepository.findByUserId(userId, [
      'id',
    ]);

    if (!supplier) {
      throw new AppError('User is not a supplier.', 400);
    }

    const proceduresOfSupplier = await this.proceduresRepository.findBySupplierId(
      supplier.id,
    );

    const nameClash = proceduresOfSupplier.find(proc => proc.name === name);

    if (nameClash) {
      throw new AppError('Procedure with same name already exists.', 409);
    }

    const procedure = this.proceduresRepository.create({
      supplierId: supplier.id,
      name,
      duration,
      price,
    });

    return procedure;
  }
}

export default CreateProcedureService;
