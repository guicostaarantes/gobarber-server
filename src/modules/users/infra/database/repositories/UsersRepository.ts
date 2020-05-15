import {
  Repository,
  getRepository,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';

import {
  IUsersRepository,
  ICreateUserDTO,
} from '../../../repositories/IUsersRepository';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  baseRepository: Repository<User>;

  constructor() {
    this.baseRepository = getRepository(User);
  }

  public async create({
    fullName,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const newUser = this.baseRepository.create({ fullName, email, password });

    const user = await this.baseRepository.save(newUser);

    return user;
  }

  public async update(user: User): Promise<User> {
    await this.baseRepository.save(user);
    return user;
  }

  public async find(page: number, fields: (keyof User)[]): Promise<User[]> {
    const options = {
      take: 10,
      skip: 10 * (page - 1),
    } as FindManyOptions;
    if (fields.length) {
      options.select = fields;
    }
    const users = await this.baseRepository.find(options);
    return users;
  }

  public async findById(id: string, fields: (keyof User)[]): Promise<User> {
    const options = {
      where: { id },
    } as FindOneOptions;
    if (fields.length) {
      options.select = fields;
    }
    const user = await this.baseRepository.findOne(options);
    return user;
  }

  public async findByEmail(
    email: string,
    fields: (keyof User)[],
  ): Promise<User> {
    const options = {
      where: { email },
    } as FindOneOptions;
    if (fields.length) {
      options.select = fields;
    }
    const user = await this.baseRepository.findOne(options);
    return user;
  }
}
export default UsersRepository;
