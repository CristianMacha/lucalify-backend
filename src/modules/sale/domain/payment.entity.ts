import { SaleEntity } from './sale.entity';

export interface PaymentEntity {
  id: string;
  sale: SaleEntity;
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
