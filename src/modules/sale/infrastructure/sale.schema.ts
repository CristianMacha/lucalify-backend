import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Payment } from './payment.schema';
import { ProductSale } from './product-sale.schema';
import { Client } from '../../client/infrastructure/client.schema';

@Entity({ name: 'sales' })
export class Sale {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false })
  total: number;

  @Column({ nullable: true })
  discount: number;

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

  @ManyToOne(() => Client, (client) => client.sales, { nullable: true })
  client: Client;

  @OneToMany(() => Payment, (payment) => payment.sale)
  payments: Payment[];

  @OneToMany(() => ProductSale, (productSale) => productSale.sale)
  productSales: ProductSale[];
}
