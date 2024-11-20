import { ClientEntity } from '../../client/domain/client.entity';
import { PaymentEntity } from './payment.entity';
import { ProductSaleEntity } from './product-sale.entity';

export interface SaleEntity {
  id: string;
  client?: ClientEntity;
  total: number;
  discount: number;
  rounding: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  productSales: ProductSaleEntity[];
  payments: PaymentEntity[];
}

export interface FilterSale {
  textSearch?: string;
  fromDate?: Date;
  toDate?: Date;
  page: number;
  perPage: number;
}

export interface CreateSale {
  // clientId?: string;
  // payments: CreatePaymentSale[];
  products: CreateProductSale[];
}

export interface CreatePaymentSale {
  id: string;
  amount: number;
  note: string;
  paymentDate: Date;
}

export interface CreateProductSale {
  productId: string;
  quantity: number;
}
