import { container } from 'tsyringe';
import AppointmentsRepository from '../../modules/appointments/infra/database/repositories/AppointmentsRepository';
import UsersRepository from '../../modules/users/infra/database/repositories/UsersRepository';
import DiskStorageProvider from '../providers/StorageProvider/implementations/DiskStorageProvider';
import FakeMailProvider from '../providers/MailProvider/implementations/FakeMailProvider';
import JWTokenProvider from '../providers/TokenProvider/implementations/JWTokenProvider';
import { IAppointmentsRepository } from '../../modules/appointments/repositories/IAppointmentsRepository';
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import { IStorageProvider } from '../providers/StorageProvider/IStorageProvider';
import { IMailProvider } from '../providers/MailProvider/IMailProvider';
import { ITokenProvider } from '../providers/TokenProvider/ITokenProvider';

// Repositories

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

// Providers

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
container.registerSingleton<IMailProvider>('MailProvider', FakeMailProvider);
container.registerSingleton<ITokenProvider>('TokenProvider', JWTokenProvider);
