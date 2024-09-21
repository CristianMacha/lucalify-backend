import { v4 as uuid } from 'uuid';

import { ProductEntity } from './product.entity';
import { CategoryValue } from '../../category/domain/category.value';
import { ProductVariantValue } from './product-variant.value';

export class ProductValue implements ProductEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  category: CategoryValue;
  variants: ProductVariantValue[];

  constructor(
    name: string,
    description: string,
    price: number,
    category: CategoryValue,
  ) {
    this.id = uuid();
    this.name = name;
    this.description = description;
    this.price = price;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.category = category;
    this.variants = [];
  }
}
