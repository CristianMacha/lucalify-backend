import { v4 as uuid } from 'uuid';
import { UserValue } from '../../user/domain/user.value';
import { SaleEntity } from './sale.entity';

export class SaleValue implements SaleEntity {
  id: string;
  user: UserValue | null;
  total: number;
  discount: number;
  rounding: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(createSale: CreateSale, userId: string) {
    const { user, total, discount, rounding } = createSale;
    this.id = uuid();
    this.user = user;
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
  user: UserValue | null;
  total: number;
  discount: number;
  rounding: number;
}
