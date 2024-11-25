import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Payment } from './payment.schema';
import { ProductTrade } from './product-trade.schema';
import { Client } from '../../client/infrastructure/client.schema';

enum TradeType {
  SALE = 'sale',
  PURCHASE = 'purchase',
}

@Entity({ name: 'trades' })
export class Trade {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false })
  total: number;

  @Column({ nullable: true })
  discount: number;

  @Column({
    type: 'enum',
    enum: TradeType,
    nullable: false,
    default: TradeType.SALE,
  })
  type: TradeType;

  @Column({ nullable: true })
  rounding: number;

  @Column({ nullable: false })
  createdBy: string;

  @Column({ nullable: false })
  updatedBy: string;

  @Column({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => Client, (client) => client.trades, { nullable: true })
  client?: Client;

  @OneToMany(() => Payment, (payment) => payment.trade)
  payments: Payment[];

  @OneToMany(() => ProductTrade, (productTrade) => productTrade.trade)
  productTrades: ProductTrade[];
}
