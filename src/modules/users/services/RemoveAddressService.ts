import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAddressesRepository from '../repositories/IAddressesRepository';

import User from '../infra/typeorm/entities/User';


interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class RemoveAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<void> {
    const checkAddressExist = await this.addressesRepository.findById(id);

    if (!checkAddressExist) {
      throw new AppError('Address not found.')
    }

    await this.addressesRepository.delete(id);

  }
}

export default RemoveAddressService;