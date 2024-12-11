import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RoleAccess } from './role-access.schema';
import { AccessEntity } from '../domain/access.entity';

@Entity({ name: 'access' })
export class Access implements AccessEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'tinyint', default: 0 })
  order: number;

  @OneToMany(() => RoleAccess, (roleAccess) => roleAccess.access)
  roleAccess: RoleAccess[];
}
