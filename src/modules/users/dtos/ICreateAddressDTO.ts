import User from "../infra/typeorm/entities/User";

export default interface ICreateAddressDTO {
  street: string;
  number: number;
  district: string;
  city: string;
  uf: string;
  country: string;
  user?: User;
}