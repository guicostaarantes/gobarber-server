import IUser from '../entities/IUser';

export interface ICreateUserDTO {
  fullName: string;
  email: string;
  password: string;
}

export interface IUsersRepository {
  create(dto: ICreateUserDTO): Promise<IUser>;
  update(user: IUser): Promise<IUser>;
  find(page: number, fields: (keyof IUser)[]): Promise<IUser[]>;
  findById(id: string, fields: (keyof IUser)[]): Promise<IUser>;
  findByEmail(email: string, fields: (keyof IUser)[]): Promise<IUser>;
}
