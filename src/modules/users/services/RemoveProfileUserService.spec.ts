import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import RemoveProfileUserService from './RemoveProfileUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let createAddress: RemoveProfileUserService;
let removeProfile: RemoveProfileUserService;

describe('RemoveProfileUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    removeProfile = new RemoveProfileUserService(fakeUsersRepository);
  });

  it('should be able to remove an user profile', async () => {
    const user = await createUser.execute({
      name: 'Eldon',
      email: 'eldoncosta1@gmail.com',
      addresses: [],
      password: '123456'
    });

    expect(
      await removeProfile.execute({ id: user.id })
    ).toBeUndefined();

  })

  it('should not be able to remove an user profile that not exist', async () => {
    await expect(removeProfile.execute({
      id: 'not-exist-user-id',
    })).rejects.toBeInstanceOf(AppError)
  })
})