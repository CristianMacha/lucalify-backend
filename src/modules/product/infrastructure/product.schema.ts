import { Category } from '../../category/infrastructure/category.schema';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ProductVariant } from './product-variant.schema';

@Entity({ name: 'products' })
export class Product {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 10,
    scale: 2,
    default: 0,
  })
  price: number;

  @Column({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @OneToMany(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants: ProductVariant[];
}
