import {
  ISuppliersRepository,
  ICreateSupplierDTO,
} from './ISuppliersRepository';
import FakeSupplier from '../entities/FakeSupplier';

class FakeSuppliersRepository implements ISuppliersRepository {
  public table: FakeSupplier[];

  constructor() {
    this.table = [];
  }

  public async create({
    userId,
    latitude,
    longitude,
  }: ICreateSupplierDTO): Promise<FakeSupplier> {
    const supplier = new FakeSupplier();

    supplier.userId = userId;
    supplier.latitude = latitude;
    supplier.longitude = longitude;

    this.table.push(supplier);

    return supplier;
  }

  public async find(
    page: number,
    fields: (keyof FakeSupplier)[],
  ): Promise<FakeSupplier[]> {
    const suppliers = this.table.slice(10 * (page - 1), 10).map(supplier => {
      if (fields.length) {
        Object.keys(supplier)
          .filter(key => !fields.includes(key as keyof FakeSupplier))
          // eslint-disable-next-line no-param-reassign
          .forEach(key => delete supplier[key as keyof FakeSupplier]);
      }
      return supplier;
    });
    return suppliers;
  }

  public async findById(
    id: string,
    fields: (keyof FakeSupplier)[],
  ): Promise<FakeSupplier> {
    const supplier = this.table.find(findSupplier => findSupplier.id === id);
    if (!supplier) {
      return undefined;
    }
    if (fields.length) {
      Object.keys(supplier)
        .filter(key => !fields.includes(key as keyof FakeSupplier))
        // eslint-disable-next-line no-param-reassign
        .forEach(key => delete supplier[key as keyof FakeSupplier]);
    }
    return supplier;
  }

  public async findByUserId(
    userId: string,
    fields: (keyof FakeSupplier)[],
  ): Promise<FakeSupplier> {
    const supplier = this.table.find(
      findSupplier => findSupplier.userId === userId,
    );
    if (!supplier) {
      return undefined;
    }
    if (fields.length) {
      Object.keys(supplier)
        .filter(key => !fields.includes(key as keyof FakeSupplier))
        // eslint-disable-next-line no-param-reassign
        .forEach(key => delete supplier[key as keyof FakeSupplier]);
    }
    return supplier;
  }

  public async findByNearestLocation(
    page: number,
    latitude: number,
    longitude: number,
    tolerance: number,
    fields: (keyof FakeSupplier)[],
  ): Promise<FakeSupplier[]> {
    const suppliers = this.table.map(supplier => {
      return {
        ...supplier,
        distance:
          6371 *
          Math.acos(
            Math.cos((supplier.latitude * Math.PI) / 180) *
              Math.cos((latitude * Math.PI) / 180) *
              Math.cos(((longitude - supplier.longitude) * Math.PI) / 180) +
              Math.sin((supplier.latitude * Math.PI) / 180) *
                Math.sin((latitude * Math.PI) / 180),
          ),
      };
    });
    suppliers
      .filter(
        supplier =>
          Math.abs(latitude - supplier.latitude) < tolerance &&
          Math.abs(
            (longitude - supplier.longitude) /
              Math.cos((latitude * Math.PI) / 180),
          ) < tolerance,
      )
      .sort((a, b) => (a.distance > b.distance ? 1 : -1))
      .slice(10 * (page - 1), 10)
      .map(supplier => {
        if (fields.length) {
          Object.keys(supplier)
            .filter(key => !fields.includes(key as keyof FakeSupplier))
            // eslint-disable-next-line no-param-reassign
            .forEach(key => delete supplier[key as keyof FakeSupplier]);
        }
        return supplier;
      });
    return suppliers;
  }
}
export default FakeSuppliersRepository;
