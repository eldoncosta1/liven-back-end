import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';
import Address from '../entities/Address';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;
  private addressOrmRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(User);
    this.addressOrmRepository = getRepository(Address);
  }

  public async create({ name, email, password, addresses }: ICreateUsersDTO): Promise<User> {

    const user = this.ormRepository.create({ name, email, password, addresses });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

}

export default UsersRepository;