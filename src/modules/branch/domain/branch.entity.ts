import { TenantEntity } from '../../tenant/domain/tenant.entity';

export interface BranchEntity {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  tenant: TenantEntity | null;
}
