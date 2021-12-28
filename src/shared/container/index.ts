import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUsersTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

import IAddressesRepository from '@modules/users/repositories/IAddressesRepository';
import AddressesRepository from '@modules/users/infra/typeorm/repositories/AddressesRepository';


container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
);

container.registerSingleton<IAddressesRepository>(
  'AddressesRepository',
  AddressesRepository
);