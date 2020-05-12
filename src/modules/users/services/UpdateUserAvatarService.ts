import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import IUser from '../entities/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IStorageProvider } from '../../../shared/providers/StorageProvider/IStorageProvider';
import AppError from '../../../shared/errors/AppError';

interface IServiceRequest {
  userId: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    userId,
    avatarFilename,
  }: IServiceRequest): Promise<IUser> {
    const user = await this.usersRepository.findById(userId, ['id', 'avatar']);

    if (!user) {
      throw new AppError('Resource not found', 404);
    }

    this.storageProvider.uploadFile(avatarFilename);

    if (user.avatar) {
      this.storageProvider.deleteFile(user.avatar);
    }

    user.avatar = avatarFilename;
    await this.usersRepository.update(user);

    return user;
  }
}

export default UpdateUserAvatarService;
