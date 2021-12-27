
import { uuid } from 'uuidv4';

import IAddressesRepository from '@modules/users/repositories/IAddressesRepository';
import ICreateAddressDTO from '@modules/users/dtos/ICreateAddressDTO';

import Address from '../../infra/typeorm/entities/Address';

class AddressesRepository implements IAddressesRepository {
  private addresses: Address[] = [];

  public async findById(id: string): Promise<Address | undefined> {
    const findAddress = this.addresses.find(address => address.id === id);
    return findAddress;
  }

  public async create({
    street,
    district,
    number,
    city,
    country,
    uf
  }: ICreateAddressDTO): Promise<Address> {

    const address = new Address();

    Object.assign(address, { id: uuid(), street, district, number, city, country, uf });

    this.addresses.push(address);

    return address;
  }

  public async save(address: Address): Promise<Address> {
    const findIndex = this.addresses.findIndex(findAddress => findAddress.id === address.id);

    this.addresses[findIndex] = address;

    return address;
  }

  public async delete(id: string): Promise<void> {
    const findAddressIndex = this.addresses.findIndex(findAddress => findAddress.id === id);

    if (findAddressIndex != -1) {
      this.addresses.splice(findAddressIndex, 1);
    }
  }

  public async findByUserId(user_id: string): Promise<Address[]> {
    const listAddresses = this.addresses.filter(address => address.user.id === user_id);

    return listAddresses;

  }

  public async findByCountry(user_id: string, country: string): Promise<Address[]> {
    const listAddresses = this.addresses
      .filter(address => address.user.id === user_id)
      .filter(address => address.country === country)

    return listAddresses;

  }

}

export default AddressesRepository;