import { CategoryEntity } from '../../category/domain/category.entity';
import { ProductVariantEntity } from './product-variant.entity';

export interface ProductEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  category: CategoryEntity;
  variants: ProductVariantEntity[];
}
