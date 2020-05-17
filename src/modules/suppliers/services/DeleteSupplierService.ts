import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import { ISuppliersRepository } from '../repositories/ISuppliersRepository';
import AppError from '../../../shared/errors/AppError';

@injectable()
class CreateSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute(userId: string): Promise<void> {
    const supplier = await this.suppliersRepository.findByUserId(userId, []);

    if (!supplier) {
      throw new AppError('Resource not found.', 404);
    }

    await this.suppliersRepository.delete(supplier.id);
  }
}

export default CreateSupplierService;
