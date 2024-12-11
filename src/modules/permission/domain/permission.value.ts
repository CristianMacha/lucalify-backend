import { v4 as uuid } from 'uuid';

import { PermissionEntity } from './permission.entity';
import { RolePermissionValue } from './role-permission.value';

export class PermissionValue implements PermissionEntity {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  rolePermissions: RolePermissionValue[];

  constructor(name: string, description?: string) {
    this.id = uuid();
    this.name = name;
    this.description = description || '';
    this.isActive = true;
    this.rolePermissions = [];
  }
}
