import { getRepository, Repository } from 'typeorm';

import IAddressesRepository from '@modules/users/repositories/IAddressesRepository';
import ICreateAddressDTO from '@modules/users/dtos/ICreateAddressDTO';

import Address from '../entities/Address';

class AddressesRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create(
    {
      street,
      district,
      number,
      city,
      country,
      uf,
      user
    }: ICreateAddressDTO): Promise<Address> {

    const address = this.ormRepository.create({
      street,
      district,
      number,
      city,
      country,
      uf,
      user
    });

    await this.ormRepository.save(address);

    return address;
  }

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address);
  }

  public async findById(id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne(id);

    return address;
  }

  public async findByUserId(user_id: string): Promise<Address[]> {
    const address = await this.ormRepository.find({
      where: {
        user: {
          id: user_id
        }
      }
    });


    return address;
  }

  public async findByCountry(user_id: string, country: string): Promise<Address[]> {
    const address = await this.ormRepository.find({
      where: {
        user: {
          id: user_id
        },
        country
      }
    });


    return address;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

}

export default AddressesRepository;