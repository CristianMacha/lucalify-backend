import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { RolePermission } from '../../permission/infrastructure/role-permission.schema';
import { User } from '../../user/infrastructure/user.schema';
import { RoleAccess } from '../../permission/infrastructure/role-access.schema';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermissions: RolePermission[];

  @OneToMany(() => RoleAccess, (roleAccess) => roleAccess.role)
  roleAccess: RoleAccess[];
}
