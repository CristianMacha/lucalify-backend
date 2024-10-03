import { ProductEntity } from '../../product/domain/product.entity';
import { SaleEntity } from './sale.entity';

export interface ProductSaleEntity {
  id: string;
  product: ProductEntity;
  sale: SaleEntity;
  quantity: number;
  price: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
