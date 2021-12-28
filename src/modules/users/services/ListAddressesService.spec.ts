import FakeAddressesRepository from '../repositories/fake/FakeAddressesRepository';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import ListAddressesService from './ListAddressesService';

let fakeAddressesRepository: FakeAddressesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let listAddresses: ListAddressesService;

describe('ListAddressesService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeAddressesRepository = new FakeAddressesRepository();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    listAddresses = new ListAddressesService(fakeAddressesRepository);
  });

  it('should be able to list addresses from an user', async () => {
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

    const addresses = await listAddresses.execute({
      user_id: user.id
    });

    expect(addresses).toEqual([address1, address2]);
  })
})