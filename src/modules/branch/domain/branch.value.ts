import { v4 as uuid } from 'uuid';

import { BranchEntity } from './branch.entity';
import { TenantValue } from '../../tenant/domain/tenant.value';

export class BranchValue implements BranchEntity {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  tenant: TenantValue;

  constructor(name: string, tenant: TenantValue, description?: string) {
    this.id = uuid();
    this.name = name;
    this.description = description || '';
    this.createdBy = 'admin';
    this.updatedBy = 'admin';
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.tenant = tenant;
  }
}
