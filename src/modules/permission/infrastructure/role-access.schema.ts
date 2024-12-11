import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Access } from './access.schema';
import { Role } from '../../role/infrastructure/role.schema';
import { RoleAccessEntity } from '../domain/role-access.entity';

@Entity({ name: 'role_access' })
export class RoleAccess implements RoleAccessEntity {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => Role, (role) => role.roleAccess)
  role: Role;

  @ManyToOne(() => Access, (access) => access.roleAccess)
  access: Access;
}
