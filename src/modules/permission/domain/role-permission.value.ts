import { v4 as uuid } from 'uuid';

import { RoleValue } from 'src/modules/role/domain/role.value';
import { RolePermissionEntity } from './role-permission.entity';
import { PermissionValue } from './permission.value';

export class RolePermissionValue implements RolePermissionEntity {
  id: string;
  role: RoleValue;
  permission: PermissionValue;

  constructor(role: RoleValue, permission: PermissionValue) {
    this.id = uuid();
    this.role = role;
    this.permission = permission;
  }
}
