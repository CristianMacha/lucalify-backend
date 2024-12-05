import { v4 as uuid } from 'uuid';
import { PaymentEntity } from './payment.entity';
import { ClientValue } from '../../client/domain/client.value';
import { ProductTradeValue } from './product-trade.value';
import { TradeEntity, TradeType } from './trade.entity';

export class TradeValue implements TradeEntity {
  id: string;
  client?: ClientValue;
  total: number;
  discount: number;
  type: TradeType;
  rounding: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  productTrades: ProductTradeValue[];
  payments: PaymentEntity[];

  constructor(
    total: number,
    discount: number,
    rounding: number,
    userId: string,
    type: TradeType = TradeType.SALE,
  ) {
    this.id = uuid();
    this.total = total;
    this.discount = discount;
    this.type = type;
    this.rounding = rounding;
    this.createdBy = userId;
    this.updatedBy = userId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export interface CreateTrade {
  client?: ClientValue;
  total: number;
  discount: number;
  rounding: number;
}

export interface FilterTradeReport {
  startDate: Date;
  endDate: Date;
  tradeType: TradeType;
}
