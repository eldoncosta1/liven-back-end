
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Address from '../infra/typeorm/entities/Address';
import IAddressesRepository from '../repositories/IAddressesRepository';

interface IRequest {
  id: string;
  street: string;
  district: string;
  number: number;
  city: string;
  uf: string;
  country: string;
}

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,

  ) { }

  public async execute({ id, street, district, number, city, uf, country }: IRequest): Promise<Address> {
    const address = await this.addressesRepository.findById(id);

    if (!address) {
      throw new AppError('Address not found');
    }

    address.street = street;
    address.district = district;
    address.number = number;
    address.city = city;
    address.uf = uf;
    address.country = country;

    await this.addressesRepository.save(address);

    return address;
  }
}

export default UpdateAddressService;