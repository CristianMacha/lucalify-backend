import { RoleAccessEntity } from './role-access.entity';

export interface AccessEntity {
  id: string;
  name: string;
  path: string;
  isActive: boolean;
  roleAccess: RoleAccessEntity[];
  order: number;
}
