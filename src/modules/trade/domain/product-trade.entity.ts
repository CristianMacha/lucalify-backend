import { ProductEntity } from '../../product/domain/product.entity';
import { TradeEntity } from './trade.entity';

export interface ProductTradeEntity {
  id: string;
  product: ProductEntity;
  trade: TradeEntity;
  quantity: number;
  price: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
