import { uuid } from 'uuidv4';
import FakeUsersRepository from '../repositories/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeHashProvider from '../../../shared/providers/HashProvider/implementations/FakeHashProvider';
import FakeStorageProvider from '../../../shared/providers/StorageProvider/implementations/FakeStorageProvider';
import AppError from '../../../shared/errors/AppError';

describe('Update User Avatar Service', () => {
  let usersRepository: FakeUsersRepository;
  let hashProvider: FakeHashProvider;
  let storageProvider: FakeStorageProvider;
  let service: UpdateUserAvatarService;
  const id = uuid();
  let deleteFileSpy: jest.SpyInstance;

  beforeAll(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    storageProvider = new FakeStorageProvider();
    deleteFileSpy = jest.spyOn(storageProvider, 'deleteFile');
    service = new UpdateUserAvatarService(usersRepository, storageProvider);
  });

  beforeEach(async () => {
    usersRepository.table = [
      {
        id,
        fullName: 'Fulano da Silva',
        email: 'fulano@teste.com.br',
        isProvider: false,
        avatar: null,
        password: await hashProvider.hash('Ful4nO*2020'),
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
