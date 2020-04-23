import { getRepository } from 'typeorm';

import User from '../models/User';

interface ServiceRequest {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({
    userId,
    avatarFilename,
  }: ServiceRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { id: userId } });

    // TODO: remove old avatar

    user.avatar = avatarFilename;
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
