import { hash } from 'bcryptjs';
import { uuid } from 'uuidv4';
import FakeUsersRepository from '../repositories/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeStorageProvider from '../../../shared/providers/StorageProvider/implementations/FakeStorageProvider';
import AppError from '../../../shared/errors/AppError';

describe('Update User Avatar Service', () => {
  let usersRepository: FakeUsersRepository;
  let storageProvider: FakeStorageProvider;
  let service: UpdateUserAvatarService;
  const id = uuid();
  let deleteFileSpy: jest.SpyInstance;

  beforeAll(() => {
    usersRepository = new FakeUsersRepository();
    storageProvider = new FakeStorageProvider();
    deleteFileSpy = jest.spyOn(storageProvider, 'deleteFile');
    service = new UpdateUserAvatarService(usersRepository, storageProvider);
  });

  beforeEach(async () => {
    const password = await hash('Ful4nO*2020', 8);
    usersRepository.table = [
      {
        id,
        fullName: 'Fulano da Silva',
        email: 'fulano@teste.com.br',
        isProvider: false,
        avatar: null,
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
  });

  it('Should update avatar', async () => {
    await expect(
      service.execute({
        userId: id,
        avatarFilename: 'avatar.jpg',
      }),
    ).resolves.toBeTruthy();
    expect(usersRepository.table[0].avatar).toBe('avatar.jpg');
  });

  it('Should not update avatar if user does not exist', async () => {
    await expect(
      service.execute({
        userId: uuid(),
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should update avatar and delete old file', async () => {
    usersRepository.table[0].avatar = 'old-avatar.jpg';
    await expect(
      service.execute({
        userId: id,
        avatarFilename: 'new-avatar.jpg',
      }),
    ).resolves.toBeTruthy();
    expect(usersRepository.table[0].avatar).toBe('new-avatar.jpg');
    expect(deleteFileSpy).toBeCalledWith('old-avatar.jpg');
  });
});
