import { ProductVariantAttributeEntity } from './product-variant-attribute.entity';
import { ProductEntity } from './product.entity';

export interface ProductVariantEntity {
  id: string;
  stock: number;
  price: number;
  product: ProductEntity;
  productVariantAttributes: ProductVariantAttributeEntity[];
}
