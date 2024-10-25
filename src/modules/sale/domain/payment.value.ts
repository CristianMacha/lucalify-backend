import { PaymentEntity } from './payment.entity';
import { SaleValue } from './sale.value';

export class PaymentValue implements PaymentEntity {
  id: string;
  sale: SaleValue;
  amount: number;
  note: string;
  paymentDate: Date;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(createPayment: CreatePayment, userId: string) {
    const { sale, amount, note, paymentDate, id } = createPayment;
    this.id = id;
    this.sale = sale;
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
  sale: SaleValue;
  amount: number;
  note: string;
  paymentDate: Date;
}
