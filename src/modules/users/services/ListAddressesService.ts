import { inject, injectable } from "tsyringe";

import Address from "../infra/typeorm/entities/Address";
import IAddressesRepository from "../repositories/IAddressesRepository";

interface IRequest {
  user_id: string;
}

@injectable()
class ListAddressesService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository
  ) { }

  public async execute({ user_id }: IRequest): Promise<Address[]> {

    const addresses = await this.addressesRepository.findByUserId(user_id);

    return addresses;
  }
}

export default ListAddressesService;