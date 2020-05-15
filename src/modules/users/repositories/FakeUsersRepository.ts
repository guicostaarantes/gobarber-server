import { IUsersRepository, ICreateUserDTO } from './IUsersRepository';
import FakeUser from '../entities/FakeUser';

class FakeUsersRepository implements IUsersRepository {
  public table: FakeUser[];

  constructor() {
    this.table = [];
  }

  public async create({
    fullName,
    email,
    password,
  }: ICreateUserDTO): Promise<FakeUser> {
    const user = new FakeUser();

    user.fullName = fullName;
    user.email = email;
    user.password = password;

    this.table.push(user);

    return user;
  }

  public async update(user: FakeUser): Promise<FakeUser> {
    const userIndex = this.table.findIndex(findUser => findUser.id === user.id);

    this.table[userIndex] = user;

    return user;
  }

  public async find(
    page: number,
    fields: (keyof FakeUser)[],
  ): Promise<FakeUser[]> {
    const users = this.table.slice(10 * (page - 1), 10).map(user => {
      if (fields.length) {
        Object.keys(user)
          .filter(key => !fields.includes(key as keyof FakeUser))
          // eslint-disable-next-line no-param-reassign
          .forEach(key => delete user[key as keyof FakeUser]);
      }
      return user;
    });
    return users;
  }

  public async findById(
    id: string,
    fields: (keyof FakeUser)[],
  ): Promise<FakeUser> {
    const user = this.table.find(findUser => findUser.id === id);
    if (!user) {
      return undefined;
    }
    if (fields.length) {
      Object.keys(user)
        .filter(key => !fields.includes(key as keyof FakeUser))
        // eslint-disable-next-line no-param-reassign
        .forEach(key => delete user[key as keyof FakeUser]);
    }
    return user;
  }

  public async findByEmail(
    email: string,
    fields: (keyof FakeUser)[],
  ): Promise<FakeUser> {
    const user = this.table.find(findUser => findUser.email === email);
    if (!user) {
      return undefined;
    }
    if (fields.length) {
      Object.keys(user)
        .filter(key => !fields.includes(key as keyof FakeUser))
        // eslint-disable-next-line no-param-reassign
        .forEach(key => delete user[key as keyof FakeUser]);
    }
    return user;
  }
}
export default FakeUsersRepository;
