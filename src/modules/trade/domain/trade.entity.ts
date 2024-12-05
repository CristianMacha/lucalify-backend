import { ClientEntity } from '../../client/domain/client.entity';
import { PaymentEntity } from './payment.entity';
import { ProductTradeEntity } from './product-trade.entity';

export enum TradeType {
  SALE = 'sale',
  PURCHASE = 'purchase',
}

export interface TradeEntity {
  id: string;
  client?: ClientEntity;
  total: number;
  discount: number;
  type: TradeType;
  rounding: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  productTrades: ProductTradeEntity[];
  payments: PaymentEntity[];
}

export interface FilterTrade {
  textSearch?: string;
  fromDate?: Date;
  toDate?: Date;
  page: number;
  perPage: number;
  type: TradeType;
}

export interface CreateTrade {
  clientId?: string;
  // payments: CreatePaymentSale[];
  productTrades: CreateProductTrade[];
  type: TradeType;
}

export interface CreatePaymentTrade {
  id: string;
  amount: number;
  note: string;
  paymentDate: Date;
}

export interface CreateProductTrade {
  productId: string;
  quantity: number;
}
