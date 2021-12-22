import ICreateAddressDTO from "./ICreateAddressDTO";

export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  addresses: ICreateAddressDTO[];
}