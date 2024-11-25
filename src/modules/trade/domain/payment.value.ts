import { PaymentEntity } from './payment.entity';
import { TradeValue } from './trade.value';

export class PaymentValue implements PaymentEntity {
  id: string;
  trade: TradeValue;
  amount: number;
  note: string;
  paymentDate: Date;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(createPayment: CreatePayment, userId: string) {
    const { trade, amount, note, paymentDate, id } = createPayment;
    this.id = id;
    this.trade = trade;
    this.amount = amount;
    this.note = note;
    this.paymentDate = paymentDate;
    this.createdBy = userId;
    this.updatedBy = userId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export interface CreatePayment {
  id: string;
  trade: TradeValue;
  amount: number;
  note: string;
  paymentDate: Date;
}
