export default interface ISupplier {
  id: string;
  userId: string;
  name: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
