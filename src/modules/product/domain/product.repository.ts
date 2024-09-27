import { ResponseList } from 'src/common/interfaces/response.interface';
import { FilterProductDto } from '../aplication/dtos/filter-product.dto';
import { ProductValue } from './product.value';

export interface ProductRepository {
  findProductById(id: string): Promise<ProductValue | null>;
  registerProduct(product: ProductValue): Promise<ProductValue | null>;
  listProduct(
    filterProductDto: FilterProductDto,
  ): Promise<ResponseList<ProductValue>>;
  updateProduct(product: ProductValue): Promise<ProductValue | null>;
}
