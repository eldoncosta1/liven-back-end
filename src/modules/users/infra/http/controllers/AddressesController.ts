import { Request, Response } from "express";
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateAddressService from "@modules/users/services/CreateAddressService";

export default class AddressesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { street, district, number, city, country, uf } = request.body;
    const user_id = request.user.id;

    const createAddress = container.resolve(CreateAddressService);

    const addressCreated = await createAddress.execute({
      street,
      district,
      number,
      city,
      country,
      uf,
      user_id
    });


    return response.json(classToClass(addressCreated));
  }

}