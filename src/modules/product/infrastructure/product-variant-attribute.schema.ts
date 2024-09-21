import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductVariant } from './product-variant.schema';
import { AttributeValue } from './attribute-value.schema';

@Entity({ name: 'product_variant_attributes' })
export class ProductVariantAttribute {
  @PrimaryColumn()
  product_variant_id: number;

  @PrimaryColumn()
  attribute_value_id: number;

  @ManyToOne(
    () => ProductVariant,
    (productVariant) => productVariant.productVariantAttributes,
  )
  @JoinColumn({ name: 'product_variant_id' })
  productVariant: ProductVariant;

  @ManyToOne(
    () => AttributeValue,
    (attributeValue) => attributeValue.productVariantAttributes,
  )
  @JoinColumn({ name: 'attribute_value_id' })
  attributeValue: AttributeValue;
}
