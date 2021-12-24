import Address from '../infra/typeorm/entities/Address';
import ICreateAddressDTO from '../dtos/ICreateAddressDTO';

export default interface IAddressesRepository {
  findById(id: string): Promise<Address | undefined>;
  findByUserId(user_id: string): Promise<Address[]>;
  create(data: ICreateAddressDTO): Promise<Address>;
  save(address: Address): Promise<Address>;
  delete(id: string): Promise<void>;
}