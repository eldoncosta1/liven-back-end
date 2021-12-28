import FakeAddressesRepository from '../repositories/fake/FakeAddressesRepository';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import ListAddressesByCountryService from './ListAddressesByCountryService';

let fakeAddressesRepository: FakeAddressesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let listAddressesByCountry: ListAddressesByCountryService;

describe('ListAddressesByCountryService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeAddressesRepository = new FakeAddressesRepository();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    listAddressesByCountry = new ListAddressesByCountryService(fakeAddressesRepository);
  });

  it('should be able to list addresses by country from an user', async () => {
    const user = await createUser.execute({
      name: 'Eldon',
      email: 'eldoncosta1@gmail.com',
      addresses: [],
      password: '123456'
    });

    const address1 = await fakeAddressesRepository.create({
      street: 'Rua Cinza',
      district: 'Caminho do Sol',
      number: 217,
      city: 'Petrolina',
      uf: 'PE',
      country: 'BR',
      user
    });

    const address2 = await fakeAddressesRepository.create({
      street: 'Rua do Vermelho',
      district: 'Caminho do Sol',
      number: 516,
      city: 'Petrolina',
      uf: 'PE',
      country: 'BR',
      user
    });

    const addresses = await listAddressesByCountry.execute({
      user_id: user.id, country: 'BR'
    });

    expect(addresses).toEqual([address1, address2]);
  })
})