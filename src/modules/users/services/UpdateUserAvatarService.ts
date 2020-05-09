import IUser from '../entities/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IServiceRequest {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    userId,
    avatarFilename,
  }: IServiceRequest): Promise<IUser> {
    const user = await this.usersRepository.findById(userId, ['id', 'avatar']);

    // TODO: remove old avatar

    user.avatar = avatarFilename;
    await this.usersRepository.update(user);

    return user;
  }
}

export default UpdateUserAvatarService;
