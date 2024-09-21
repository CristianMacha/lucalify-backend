import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Branch } from '../../branch/infrastructure/branch.schema';

@Entity({ name: 'tenants' })
export class Tenant {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  ruc: string;

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

  @OneToMany(() => Branch, (branch) => branch.tenant)
  branches: Branch[];
}
