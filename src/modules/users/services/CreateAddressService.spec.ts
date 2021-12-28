import AppError from '@shared/errors/AppError';

import FakeAddressesRepository from '../repositories/fake/FakeAddressesRepository';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateAddressService from './CreateAddressService';
import CreateUserService from './CreateUserService';

let fakeAddressesRepository: FakeAddressesRepository;
let createAddress: CreateAddressService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateAddress', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createAddress = new CreateAddressService(fakeAddressesRepository, fakeUsersRepository);
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new address', async () => {
    const user = await createUser.execute({
      name: 'Eldon',
      email: 'eldoncosta1@gmail.com',
      addresses: [],
      password: '123456'
    });

    const address = await createAddress.execute({
      street: 'Rua Cinza',
      district: 'Caminho do Sol',
      number: 217,
      city: 'Petrolina',
      uf: 'PE',
      country: 'BR',
      user_id: user.id
    });

    expect(address).toHaveProperty('id');
  });

  it('should not be able to create a new address to user that not exist', async () => {
    await expect(createAddress.execute({
      street: 'Rua Cinza',
      district: 'Caminho do Sol',
      number: 217,
      city: 'Petrolina',
      uf: 'PE',
      country: 'BR',
      user_id: 'not-exist-user-id'
    })).rejects.toBeInstanceOf(AppError)
  })
})
