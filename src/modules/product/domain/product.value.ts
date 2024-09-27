import { v4 as uuid } from 'uuid';

import { ProductEntity } from './product.entity';
import { CategoryValue } from '../../category/domain/category.value';

export class ProductValue implements ProductEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  code: string;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  category: CategoryValue;

  constructor(
    name: string,
    description: string,
    price: number,
    code: string,
    stock: number,
    category: CategoryValue,
    createdBy: string,
    updatedBy: string,
  ) {
    this.id = uuid();
    this.name = name ? name.trim().toUpperCase() : '';
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.code = code ? code.trim().toUpperCase() : '';
    this.isActive = true;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.category = category;
  }
}
