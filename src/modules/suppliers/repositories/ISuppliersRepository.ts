import ISupplier from '../entities/ISupplier';

export interface ICreateSupplierDTO {
  userId: string;
  latitude: number;
  longitude: number;
}

export interface ISuppliersRepository {
  create(dto: ICreateSupplierDTO): Promise<ISupplier>;
  update(supplier: ISupplier): Promise<ISupplier>;
  delete(id: string): Promise<void>;
  find(page: number, fields: (keyof ISupplier)[]): Promise<ISupplier[]>;
  findById(id: string, fields: (keyof ISupplier)[]): Promise<ISupplier>;
  findByUserId(userId: string, fields: (keyof ISupplier)[]): Promise<ISupplier>;
  findByNearestLocation(
    page: number,
    latitude: number,
    longitude: number,
    tolerance: number,
    fields: (keyof ISupplier)[],
  ): Promise<ISupplier[]>;
}
