import { inject, injectable } from "tsyringe";

import Address from "../infra/typeorm/entities/Address";
import IAddressesRepository from "../repositories/IAddressesRepository";

interface IRequest {
  country: string;
  user_id: string;
}

@injectable()
class ListAddressesByCountryService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository
  ) { }

  public async execute({ user_id, country }: IRequest): Promise<Address[]> {

    const addresses = await this.addressesRepository.findByCountry(user_id, country);

    return addresses;
  }
}

export default ListAddressesByCountryService;