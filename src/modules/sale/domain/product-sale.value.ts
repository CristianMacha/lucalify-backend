import { v4 as uuid } from 'uuid';
import { ProductSaleEntity } from './product-sale.entity';
import { ProductValue } from '../../product/domain/product.value';
import { SaleValue } from './sale.value';

export class ProductSaleValue implements ProductSaleEntity {
  id: string;
  product: ProductValue;
  sale: SaleValue;
  price: number;
  quantity: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(createProductSale: CreateProductSale, userId: string) {
    const { product, sale, price, quantity } = createProductSale;
    this.id = uuid();
    this.product = product;
    this.sale = sale;
    this.price = price;
    this.quantity = quantity;
    this.createdBy = userId;
    this.updatedBy = userId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export interface CreateProductSale {
  product: ProductValue;
  sale: SaleValue;
  price: number;
  quantity: number;
}
