import { ProductTradeEntity } from '../../trade/domain/product-trade.entity';
import { CategoryEntity } from '../../category/domain/category.entity';

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
  productTrades: ProductTradeEntity[];
}
