import { Request, Response } from "express";
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProductsService from "@modules/products/services/ListProductsService";

export default class ProductsController {
  public async show(request: Request, response: Response): Promise<Response> {

    const listProducts = container.resolve(ListProductsService);

    const products = await listProducts.execute();

    return response.json(classToClass(products));
  }

}