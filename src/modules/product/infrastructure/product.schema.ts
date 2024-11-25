import { Category } from '../../category/infrastructure/category.schema';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { ProductTrade } from '../../trade/infrastructure/product-trade.schema';

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

  @Column({
    nullable: false,
    default: 0,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  pricePurchase: number;

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

  @OneToMany(() => ProductTrade, (productTrade) => productTrade.product)
  productTrades: ProductTrade[];
}
