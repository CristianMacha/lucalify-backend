import { AttributeEntity } from './attribute.entity';
import { ProductVariantAttributeEntity } from './product-variant-attribute.entity';

export interface AttributeValueEntity {
  id: string;
  value: string;
  active: boolean;
  deleted: boolean;
  attribute: AttributeEntity;
  productVariantAttributes: ProductVariantAttributeEntity[];
}
