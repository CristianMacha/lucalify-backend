import { RoleEntity } from '../../role/domain/role.entity';
import { PermissionEntity } from './permission.entity';

export interface RolePermissionEntity {
  id: string;
  role: RoleEntity;
  permission: PermissionEntity;
}
