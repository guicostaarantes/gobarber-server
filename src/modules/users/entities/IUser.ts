export default interface IUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
