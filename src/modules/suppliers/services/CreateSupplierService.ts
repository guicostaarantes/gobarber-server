import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import ISupplier from '../entities/ISupplier';
import { IUsersRepository } from '../../users/repositories/IUsersRepository';
import { ISuppliersRepository } from '../repositories/ISuppliersRepository';
import AppError from '../../../shared/errors/AppError';

interface IServiceRequest {
  userId: string;
  latitude: number;
  longitude: number;
}

@injectable()
class CreateSupplierService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute({
    userId,
    latitude,
    longitude,
  }: IServiceRequest): Promise<ISupplier> {
    const user = await this.usersRepository.findById(userId, []);

    if (!user) {
      throw new AppError('Resource not found.', 404);
    }

    const existingSupplier = await this.suppliersRepository.findByUserId(
      userId,
      [],
    );

    if (existingSupplier) {
      throw new AppError('Supplier already created for user.', 409);
    }

    const supplier = await this.suppliersRepository.create({
      userId,
      latitude,
      longitude,
    });

    return supplier;
  }
}

export default CreateSupplierService;
