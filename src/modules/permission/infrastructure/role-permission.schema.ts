import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { Role } from '../../role/infrastructure/role.schema';
import { Permission } from './permission.schema';
import { RolePermissionEntity } from '../domain/role-permission.entity';

@Entity({ name: 'role_permissions' })
export class RolePermission implements RolePermissionEntity {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => Role, (role) => role.rolePermissions)
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions)
  permission: Permission;
}
