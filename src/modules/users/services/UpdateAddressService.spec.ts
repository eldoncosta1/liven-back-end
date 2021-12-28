import AppError from '@shared/errors/AppError';

import FakeAddressesRepository from '../repositories/fake/FakeAddressesRepository';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import CreateAddressService from './CreateAddressService';
import UpdateAddressService from './UpdateAddressService';


let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let fakeAddressesRepository: FakeAddressesRepository;
let createAddress: CreateAddressService;
let updateAddress: UpdateAddressService;
let fakeHashProvider: FakeHashProvider;

describe('UpdateAddress', () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createAddress = new CreateAddressService(fakeAddressesRepository, fakeUsersRepository);
    updateAddress = new UpdateAddressService(fakeAddressesRepository);
  });

  it('should be able to update an address', async () => {
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

    await updateAddress.execute({
      id: address.id,
      street: 'Rua do Vermelho',
      district: 'Caminho do Sol',
      number: 27,
      city: 'Juazeiro',
      uf: 'BA',
      country: 'BR',
    })


    expect(address.street).toBe('Rua do Vermelho');
    expect(address.number).toBe(27);
    expect(address.uf).toBe('BA');

  });

  it('should not be able to update an address that not exist', async () => {
    await expect(updateAddress.execute({
      street: 'Rua Cinza',
      district: 'Caminho do Sol',
      number: 217,
      city: 'Petrolina',
      uf: 'PE',
      country: 'BR',
      id: 'non-existing-id'
    })).rejects.toBeInstanceOf(AppError)
  })
})
