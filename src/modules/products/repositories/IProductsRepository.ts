import Product from '../infra/typeorm/entities/Product';

export default interface IProductsRepository {
  list(): Promise<Product[]>;
}