export default interface IProcedure {
  id: string;
  supplierId: string;
  name: string;
  duration: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
