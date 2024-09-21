import { BranchEntity } from '../../branch/domain/branch.entity';

export interface TenantEntity {
  id: string;
  name: string;
  ruc: string;
  description: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  branches: BranchEntity[];
}
