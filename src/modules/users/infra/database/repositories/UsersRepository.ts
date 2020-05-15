import { Repository, getRepository } from 'typeorm';

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
    const users = await this.baseRepository.find({
      select: fields,
      take: 10,
      skip: 10 * (page - 1),
    });
    return users;
  }

  public async findById(id: string, fields: (keyof User)[]): Promise<User> {
    const user = await this.baseRepository.findOne({
      select: fields,
      where: { id },
    });
    return user;
  }

  public async findByEmail(
    email: string,
    fields: (keyof User)[],
  ): Promise<User> {
    const user = await this.baseRepository.findOne({
      select: fields,
      where: { email },
    });
    return user;
  }
}
export default UsersRepository;
