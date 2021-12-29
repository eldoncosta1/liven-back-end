import { Request, Response } from "express";
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProductsService from "@modules/products/services/ListProductsService";
import ShowProductService from "@modules/products/services/ShowProductService";

export default class ProductsController {
  public async show(request: Request, response: Response): Promise<Response> {

    const listProducts = container.resolve(ListProductsService);

    const products = await listProducts.execute();

    return response.json(classToClass(products));
  }


  public async showById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = container.resolve(ShowProductService);

    const product = await showProduct.execute({ id });

    return response.json(classToClass(product));
  }

}