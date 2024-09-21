import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Tenant } from '../../tenant/infrastructure/tenant.schema';

@Entity({ name: 'branches' })
export class Branch {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  createdBy: string;

  @Column({ nullable: false })
  updatedBy: string;

  @Column({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => Tenant, (tenant) => tenant.branches)
  tenant: Tenant;
}
