import { AttributeValueEntity } from './attribute-value.entitty';
import { ProductVariantEntity } from './product-variant.entity';

export interface ProductVariantAttributeEntity {
  productVariantId: string;
  attributeValueId: string;
  productVariant: ProductVariantEntity;
  attributeValue: AttributeValueEntity;
}
