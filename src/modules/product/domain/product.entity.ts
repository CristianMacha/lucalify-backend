import { CategoryEntity } from '../../category/domain/category.entity';
import { ProductSaleEntity } from '../../sale/domain/product-sale.entity';

export interface ProductEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  isActive: boolean;
  code: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  category: CategoryEntity;
  productSales: ProductSaleEntity[];
}
