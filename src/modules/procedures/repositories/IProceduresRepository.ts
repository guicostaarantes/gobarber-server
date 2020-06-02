import IProcedure from '../entities/IProcedure';

export interface ICreateProcedureDTO {
  supplierId: string;
  name: string;
  duration: number;
  price: number;
}

export interface IProceduresRepository {
  create(dto: ICreateProcedureDTO): Promise<IProcedure>;
  update(procedure: IProcedure): Promise<IProcedure>;
  findById(id: string): Promise<IProcedure>;
  findBySupplierId(id: string): Promise<IProcedure[]>;
  delete(id: string): Promise<void>;
}
