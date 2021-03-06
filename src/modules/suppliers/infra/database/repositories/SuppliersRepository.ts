import {
  Repository,
  getRepository,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';

import {
  ISuppliersRepository,
  ICreateSupplierDTO,
} from '../../../repositories/ISuppliersRepository';
import Supplier from '../entities/Supplier';
import ISupplier from '../../../entities/ISupplier';

class SuppliersRepository implements ISuppliersRepository {
  baseRepository: Repository<Supplier>;

  constructor() {
    this.baseRepository = getRepository(Supplier);
  }

  public async create({
    userId,
    name,
    latitude,
    longitude,
  }: ICreateSupplierDTO): Promise<Supplier> {
    const newSupplier = this.baseRepository.create({
      userId,
      name,
      latitude,
      longitude,
    });

    const supplier = await this.baseRepository.save(newSupplier);

    return supplier;
  }

  public async update(supplier: Supplier): Promise<Supplier> {
    await this.baseRepository.save(supplier);
    return supplier;
  }

  public async find(
    page: number,
    fields: (keyof Supplier)[],
  ): Promise<Supplier[]> {
    const options = {
      take: 10,
      skip: 10 * (page - 1),
    } as FindManyOptions;
    if (fields.length) {
      options.select = fields;
    }
    const suppliers = await this.baseRepository.find(options);
    return suppliers;
  }

  public async findById(
    id: string,
    fields: (keyof Supplier)[],
  ): Promise<Supplier> {
    const options = {
      where: { id },
    } as FindOneOptions;
    if (fields.length) {
      options.select = fields;
    }
    const supplier = await this.baseRepository.findOne(options);
    return supplier;
  }

  public async findByUserId(
    userId: string,
    fields: (keyof Supplier)[],
  ): Promise<Supplier> {
    const options = {
      where: { userId },
    } as FindOneOptions;
    if (fields.length) {
      options.select = fields;
    }
    const supplier = await this.baseRepository.findOne(options);
    return supplier;
  }

  public async findByNearestLocation(
    page: number,
    latitude: number,
    longitude: number,
    tolerance: number,
    fields: (keyof Supplier)[],
  ): Promise<ISupplier[]> {
    const suppliers = await this.baseRepository
      .createQueryBuilder()
      .select(fields.length ? fields.join(', ') : '*')
      .addSelect(
        '6371 * acos( cos( radians(latitude) ) * cos( radians($1) ) * cos( radians(longitude) - radians($3) ) + sin( radians(latitude) ) * sin( radians($1) ) ) AS distance',
      )
      .where(
        'ABS(latitude - :latitude) < :tolerance AND ABS((longitude - :longitude) / cos(radians(latitude))) < :tolerance',
        { latitude, longitude, tolerance },
      )
      .getRawMany();
    return suppliers;
  }
}
export default SuppliersRepository;
