import Product from '../infra/typeorm/entities/Product';

export default interface IProductsRepository {
  findById(id: string): Promise<Product | undefined>;
  list(): Promise<Product[]>;
}