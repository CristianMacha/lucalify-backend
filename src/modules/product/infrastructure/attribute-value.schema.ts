import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Attribute } from './attribute.schema';
import { ProductVariantAttribute } from './product-variant-attribute.schema';

@Entity({ name: 'attribute_values' })
export class AttributeValue {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false })
  value: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: false })
  deleted: boolean;

  @ManyToOne(() => Attribute, (attribute) => attribute.values)
  attribute: Attribute;

  @OneToMany(
    () => ProductVariantAttribute,
    (productVariantAttribute) => productVariantAttribute.attributeValue,
  )
  productVariantAttributes: ProductVariantAttribute[];
}
