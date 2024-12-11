import { PermissionValue } from './permission.value';

export interface PermissionRepository {
  registerPermission(permission: PermissionValue): Promise<PermissionValue>;
  list(): Promise<PermissionValue[]>;
  findPermissionsByRoleId(roleId: string): Promise<PermissionValue[]>;
  findPermissionById(permissionId: string): Promise<PermissionValue | null>;
}
