import { v4 as uuid } from 'uuid';

import { ProductVariantEntity } from './product-variant.entity';
import { ProductValue } from './product.value';
import { ProductVariantAttributeValue } from './product-variant-attribute.value';

export class ProductVariantValue implements ProductVariantEntity {
  id: string;
  stock: number;
  price: number;
  product: ProductValue;
  productVariantAttributes: ProductVariantAttributeValue[];

  constructor(price: number, product: ProductValue) {
    this.id = uuid();
    this.stock = 0;
    this.price = price;
    this.product = product;
  }
}
