import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RolePermission } from './role-permission.schema';
import { PermissionEntity } from '../domain/permission.entity';

@Entity({ name: 'permissions' })
export class Permission implements PermissionEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
  )
  rolePermissions: RolePermission[];
}
