export default interface IUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  is_provider: boolean;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
