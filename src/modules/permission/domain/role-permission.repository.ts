import { RolePermissionValue } from './role-permission.value';

export interface RolePermissionRepository {
  registerRolePermission(
    rolePermission: RolePermissionValue,
  ): Promise<RolePermissionValue>;
}
