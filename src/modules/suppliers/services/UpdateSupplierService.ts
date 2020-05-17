import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import ISupplier from '../entities/ISupplier';
import { ISuppliersRepository } from '../repositories/ISuppliersRepository';
import AppError from '../../../shared/errors/AppError';

interface IServiceRequest {
  userId: string;
  latitude?: number;
  longitude?: number;
}

@injectable()
class CreateSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute({
    userId,
    ...changingFields
  }: IServiceRequest): Promise<ISupplier> {
    const supplier = await this.suppliersRepository.findByUserId(userId, []);

    if (!supplier) {
      throw new AppError('Resource not found.', 404);
    }

    const newSupplier = { ...supplier, ...changingFields };

    await this.suppliersRepository.update(newSupplier);

    return newSupplier;
  }
}

export default CreateSupplierService;
