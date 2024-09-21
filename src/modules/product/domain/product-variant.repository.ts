import { ProductVariantValue } from './product-variant.value';

export interface ProductVariantRepository {
  findProductVariantById(id: string): Promise<ProductVariantValue | null>;
  registerProductVariant(
    productVariant: ProductVariantValue,
  ): Promise<ProductVariantValue | null>;
  listProductVariant(): Promise<ProductVariantValue[]>;
}
