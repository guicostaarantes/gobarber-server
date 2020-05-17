import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../repositories/IUsersRepository';
import AppError from '../../../shared/errors/AppError';
import IUser from '../entities/IUser';

interface IServiceRequest {
  userId: string;
  fullName?: string;
}

@injectable()
class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    userId,
    ...changingFields
  }: IServiceRequest): Promise<IUser> {
    const user = await this.usersRepository.findById(userId, []);

    const invalid = Object.keys(changingFields).some(field =>
      ['id', 'email', 'password'].includes(field),
    );

    if (invalid) {
      throw new AppError('Bad request', 400);
    }

    const newUser = { ...user, ...changingFields };

    await this.usersRepository.update(newUser);

    return newUser;
  }
}

export default UpdateUserProfileService;
