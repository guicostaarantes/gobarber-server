import { container } from 'tsyringe';
import AppointmentsRepository from '../../modules/appointments/infra/database/repositories/AppointmentsRepository';
import UsersRepository from '../../modules/users/infra/database/repositories/UsersRepository';
import DiskStorageProvider from '../providers/StorageProvider/implementations/DiskStorageProvider';
import { IAppointmentsRepository } from '../../modules/appointments/repositories/IAppointmentsRepository';
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import { IStorageProvider } from '../providers/StorageProvider/IStorageProvider';

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
