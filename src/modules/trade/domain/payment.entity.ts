import { TradeEntity } from './trade.entity';

export interface PaymentEntity {
  id: string;
  trade: TradeEntity;
  amount: number;
  note: string;
  paymentDate: Date;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FilterPayment {
  textSearch: string;
  fromDate: Date;
  toDate: Date;
  page: number;
  perPage: number;
}
