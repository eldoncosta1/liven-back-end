import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAddressesRepository from '../repositories/IAddressesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

import Address from '../infra/typeorm/entities/Address';

interface IRequest {
  street: string,
  district: string,
  number: number,
  city: string,
  uf: string,
  country: string;
  user_id: string;
}


@injectable()
class CreateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({
    street,
    district,
    number,
    city,
    uf,
    country,
    user_id
  }: IRequest): Promise<Address> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const address = await this.addressesRepository.create({
      street,
      district,
      number,
      city,
      uf,
      country,
      user
    });

    return address;
  }
}

export default CreateAddressService;