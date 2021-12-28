import AppError from '@shared/errors/AppError';

import FakeAddressesRepository from '../repositories/fake/FakeAddressesRepository';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import RemoveAddressService from './RemoveAddressService';
import CreateAddressService from './CreateAddressService';

let fakeAddressesRepository: FakeAddressesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let createAddress: CreateAddressService;
let removeAddress: RemoveAddressService;

describe('RemoveAddressService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeAddressesRepository = new FakeAddressesRepository();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createAddress = new CreateAddressService(fakeAddressesRepository, fakeUsersRepository);
    removeAddress = new RemoveAddressService(fakeAddressesRepository);
  });

  it('should be able to remove an addresses', async () => {
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

    expect(
      await removeAddress.execute({ user_id: user.id, id: address.id })
    ).toBeUndefined();

  })

  it('should not be able to remove address that not exist', async () => {
    await expect(removeAddress.execute({
      id: 'not-exist-user-id',
      user_id: 'not-exist-user-id'
    })).rejects.toBeInstanceOf(AppError)
  })
})