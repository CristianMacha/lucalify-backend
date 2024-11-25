import { Product } from '../../product/infrastructure/product.schema';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Trade } from './trade.schema';

@Entity({ name: 'product_trades' })
export class ProductTrade {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false })
  quantity: number;

  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: false })
  createdBy: string;

  @Column({ nullable: false })
  updatedBy: string;

  @Column({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.productTrades)
  product: Product;

  @ManyToOne(() => Trade, (trade) => trade.productTrades)
  trade: Trade;
}
