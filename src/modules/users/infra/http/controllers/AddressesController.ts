import { Request, Response } from "express";
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateAddressService from "@modules/users/services/CreateAddressService";
import ListAddressesService from "@modules/users/services/ListAddressesService";
import ListAddressesByCountryService from "@modules/users/services/ListAddressesByCountryService";
import ShowAddressService from "@modules/users/services/ShowAddressService";
import UpdateAddressService from "@modules/users/services/UpdateAddressService";
import RemoveAddressService from "@modules/users/services/RemoveAddressService";

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

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showAddresses = container.resolve(ListAddressesService);

    const addresses = await showAddresses.execute({ user_id });

    return response.json(classToClass(addresses));
  }

  public async listByCountry(request: Request, response: Response): Promise<Response> {
    const { country } = request.query as any;
    const user_id = request.user.id;

    const listAddresses = container.resolve(ListAddressesByCountryService);

    const addresses = await listAddresses.execute({ user_id, country });

    return response.json(classToClass(addresses));
  }

  public async showById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAddress = container.resolve(ShowAddressService);

    const address = await showAddress.execute({ id });

    return response.json(classToClass(address));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, street, district, number, city, country, uf } = request.body;

    const updateAddress = container.resolve(UpdateAddressService);

    const addressUpdated = await updateAddress.execute({
      id,
      street,
      district,
      number,
      city,
      country,
      uf
    });


    return response.json(classToClass(addressUpdated));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.body;

    const deleteAddress = container.resolve(RemoveAddressService);

    await deleteAddress.execute({ id, user_id });

    return response.sendStatus(204);
  }

}