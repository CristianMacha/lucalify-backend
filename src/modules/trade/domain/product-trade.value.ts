import { v4 as uuid } from 'uuid';
import { ProductValue } from '../../product/domain/product.value';
import { TradeValue } from './trade.value';
import { ProductTradeEntity } from './product-trade.entity';

export class ProductTradeValue implements ProductTradeEntity {
  id: string;
  product: ProductValue;
  trade: TradeValue;
  price: number;
  quantity: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(createProductTrade: CreateProductTrade, userId: string) {
    const { product, trade, price, quantity } = createProductTrade;
    this.id = uuid();
    this.product = product;
    this.trade = trade;
    this.price = price;
    this.quantity = quantity;
    this.createdBy = userId;
    this.updatedBy = userId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export interface CreateProductTrade {
  product: ProductValue;
  trade: TradeValue;
  price: number;
  quantity: number;
}
