import { v4 as uuid } from 'uuid';
import { SaleEntity } from './sale.entity';
import { ProductSaleValue } from './product-sale.value';
import { PaymentEntity } from './payment.entity';
import { ClientValue } from '../../client/domain/client.value';

export class SaleValue implements SaleEntity {
  id: string;
  client: ClientValue;
  total: number;
  discount: number;
  rounding: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  productSales: ProductSaleValue[];
  payments: PaymentEntity[];

  constructor(
    total: number,
    discount: number,
    rounding: number,
    userId: string,
  ) {
    this.id = uuid();
    this.total = total;
    this.discount = discount;
    this.rounding = rounding;
    this.createdBy = userId;
    this.updatedBy = userId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export interface CreateSale {
  client: ClientValue;
  total: number;
  discount: number;
  rounding: number;
}
