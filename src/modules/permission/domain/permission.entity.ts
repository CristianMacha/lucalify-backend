import { RolePermissionEntity } from './role-permission.entity';

export interface PermissionEntity {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  rolePermissions: RolePermissionEntity[];
}
