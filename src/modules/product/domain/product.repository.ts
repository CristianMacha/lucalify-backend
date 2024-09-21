import { ProductValue } from './product.value';

export interface ProductRepository {
  findProductById(id: string): Promise<ProductValue | null>;
  registerProduct(product: ProductValue): Promise<ProductValue | null>;
  listProduct(): Promise<ProductValue[]>;
}
