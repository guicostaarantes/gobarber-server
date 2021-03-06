import IUser from './IUser';

class FakeUser implements IUser {
  id: string;

  fullName: string;

  email: string;

  password: string;

  avatar: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
}

export default FakeUser;
