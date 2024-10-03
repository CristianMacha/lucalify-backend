import { UserEntity } from '../../user/domain/user.entity';

export interface SaleEntity {
  id: string;
  user: UserEntity | null;
  total: number;
  discount: number;
  rounding: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FilterSale {
  textSearch: string;
  fromDate?: Date;
  toDate?: Date;
  page: number;
  perPage: number;
}

export interface CreateSale {
  clientId?: string;
  paymentDate: Date;
  amount: number;
  note: string;
  products: CreateProductSale[];
}

export interface CreateProductSale {
  productId: string;
  quantity: number;
  price: number;
}
