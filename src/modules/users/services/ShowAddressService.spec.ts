import AppError from '@shared/errors/AppError';

import FakeAddressesRepository from '../repositories/fake/FakeAddressesRepository';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ShowAddressService from './ShowAddressService';
import CreateUserService from './CreateUserService';

let fakeAddressesRepository: FakeAddressesRepository;
let showAddress: ShowAddressService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('ShowAddress', () => {

  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    showAddress = new ShowAddressService(fakeAddressesRepository);
  });

  it('should be able to show the address', async () => {

    const addressCreated = await fakeAddressesRepository.create({
      street: 'Rua Cinza',
      district: 'Caminho do Sol',
      number: 217,
      city: 'Petrolina',
      uf: 'PE',
      country: 'BR'
    });

    const address = await showAddress.execute({
      id: addressCreated.id,
    })

    expect(address?.street).toBe('Rua Cinza');
    expect(address?.country).toBe('BR');

  });

  it('should not be able to show the address that not exist', async () => {

    await expect(
      showAddress.execute({
        id: 'non-existing-user',
      })).rejects.toBeInstanceOf(AppError);

  });


});