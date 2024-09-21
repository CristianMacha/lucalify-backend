import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Product } from './product.schema';
import { ProductVariantAttribute } from './product-variant-attribute.schema';

@Entity({ name: 'product_variants' })
export class ProductVariant {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false, default: 0 })
  stock: number;

  @Column({
    nullable: false,
    default: 0,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @ManyToOne(() => Product, (product) => product.variants)
  product: Product;

  @OneToMany(
    () => ProductVariantAttribute,
    (productVariantAttribute) => productVariantAttribute.productVariant,
  )
  productVariantAttributes: ProductVariantAttribute[];
}
