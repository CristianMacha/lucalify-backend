import { ProductEntity } from '../../product/domain/product.entity';

export interface CategoryEntity {
  id: string;
  name: string;
  description: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  products: ProductEntity[];
}
