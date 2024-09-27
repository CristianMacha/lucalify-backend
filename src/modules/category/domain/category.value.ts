import { v4 as uuid } from 'uuid';

import { CategoryEntity } from './category.entity';
import { ProductValue } from '../../product/domain/product.value';

export class CategoryValue implements CategoryEntity {
  id: string;
  name: string;
  description: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  products: ProductValue[];

  constructor(name: string, description: string) {
    this.id = uuid();
    this.name = name;
    this.description = description;
    this.active = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
