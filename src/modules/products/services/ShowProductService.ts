import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

import Product from "../infra/typeorm/entities/Product";
import IProductsRepository from "../repositories/IProductsRepository";

interface IRequest {
  id: string;
}

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) { }

  public async execute({ id }: IRequest): Promise<Product | undefined> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('product not found');
    }

    return product;
  }
}

export default ShowProductService;