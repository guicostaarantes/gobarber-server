import { container } from 'tsyringe';

import AppointmentsRepository from '../../modules/appointments/infra/database/repositories/AppointmentsRepository';
import UsersRepository from '../../modules/users/infra/database/repositories/UsersRepository';
import SuppliersRepository from '../../modules/suppliers/infra/database/repositories/SuppliersRepository';
import VacanciesRepository from '../../modules/vacancies/infra/database/repositories/VacanciesRepository';
import ProceduresRepository from '../../modules/procedures/infra/database/repositories/ProceduresRepository';

import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';
import DiskStorageProvider from '../providers/StorageProvider/implementations/DiskStorageProvider';
import EtherealMailProvider from '../providers/MailProvider/implementations/EtherealMailProvider';
import JWTokenProvider from '../providers/TokenProvider/implementations/JWTokenProvider';
import HandlebarsTemplateProvider from '../providers/TemplateProvider/implementations/HandlebarsTemplateProvider';

import { IAppointmentsRepository } from '../../modules/appointments/repositories/IAppointmentsRepository';
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import { ISuppliersRepository } from '../../modules/suppliers/repositories/ISuppliersRepository';
import { IVacanciesRepository } from '../../modules/vacancies/repositories/IVacanciesRepository';
import { IProceduresRepository } from '../../modules/procedures/repositories/IProceduresRepository';

import { IHashProvider } from '../providers/HashProvider/IHashProvider';
import { IStorageProvider } from '../providers/StorageProvider/IStorageProvider';
import { IMailProvider } from '../providers/MailProvider/IMailProvider';
import { ITokenProvider } from '../providers/TokenProvider/ITokenProvider';
import { ITemplateProvider } from '../providers/TemplateProvider/ITemplateProvider';

// Repositories

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<ISuppliersRepository>(
  'SuppliersRepository',
  SuppliersRepository,
);
container.registerSingleton<IVacanciesRepository>(
  'VacanciesRepository',
  VacanciesRepository,
);
container.registerSingleton<IProceduresRepository>(
  'ProceduresRepository',
  ProceduresRepository,
);

// Providers

container.registerInstance<IHashProvider>(
  'HashProvider',
  new BCryptHashProvider(),
);
container.registerInstance<IStorageProvider>(
  'StorageProvider',
  new DiskStorageProvider(),
);
container.registerInstance<ITemplateProvider>(
  'TemplateProvider',
  new HandlebarsTemplateProvider(),
);
container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
container.registerInstance<ITokenProvider>(
  'TokenProvider',
  new JWTokenProvider(),
);
