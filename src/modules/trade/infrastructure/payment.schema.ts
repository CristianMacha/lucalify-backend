import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Trade } from './trade.schema';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false })
  amount: number;

  @Column({ nullable: true })
  note: string;

  @Column({ type: 'timestamp', nullable: false })
  paymentDate: Date;

  @Column({ nullable: false })
  createdBy: string;

  @Column({ nullable: false })
  updatedBy: string;

  @Column({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => Trade, (trade) => trade.payments)
  trade: Trade;
}
