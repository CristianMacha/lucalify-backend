import { ProductVariantAttributeValue } from './product-variant-attribute.value';

export interface ProductVariantAttributeRepository {
  findProductVariantAttributeById(
    id: string,
  ): Promise<ProductVariantAttributeValue | null>;
  registerProductVariantAttribute(
    productVariantAttribute: ProductVariantAttributeValue,
  ): Promise<ProductVariantAttributeValue | null>;
  listProductVariantAttribute(): Promise<ProductVariantAttributeValue[]>;
}
