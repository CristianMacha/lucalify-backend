import { ProductSale } from '../../sale/infrastructure/product-sale.schema';
import { Category } from '../../category/infrastructure/category.schema';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    nullable: false,
    default: 0,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({ nullable: false, default: 0 })
  stock: number;

  @Column({ nullable: false, unique: true })
  code: string;

  @Column({ nullable: false, default: true })
  isActive: boolean;

  @Column({ nullable: false })
  createdBy: string;

  @Column({ nullable: false })
  updatedBy: string;

  @Column({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => ProductSale, (productSale) => productSale.product)
  productSales: ProductSale[];
}
