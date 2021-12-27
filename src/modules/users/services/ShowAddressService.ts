import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

import Address from "../infra/typeorm/entities/Address";
import IAddressesRepository from "../repositories/IAddressesRepository";

interface IRequest {
  id: string;
}

@injectable()
class ShowAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository
  ) { }

  public async execute({ id }: IRequest): Promise<Address | undefined> {
    const address = await this.addressesRepository.findById(id);

    if (!address) {
      throw new AppError('Address not found');
    }

    return address;
  }
}

export default ShowAddressService;