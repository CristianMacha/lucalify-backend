import { v4 as uuid } from 'uuid';
import { TenantEntity } from './tenant.entity';
import { BranchValue } from '../../branch/domain/branch.value';

export class TenantValue implements TenantEntity {
  id: string;
  name: string;
  ruc: string;
  description: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  branches: BranchValue[];

  constructor(name: string, ruc: string, description?: string) {
    this.id = uuid();
    this.name = name;
    this.ruc = ruc;
    this.description = description || '';
    this.createdBy = 'admin';
    this.updatedBy = 'admin';
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.branches = [];
  }
}
