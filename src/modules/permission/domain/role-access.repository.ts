import { RoleAccessValue } from './role-access.value';

export interface RoleAccessRepository {
  register(roleAccess: RoleAccessValue): Promise<RoleAccessValue>;
  list(): Promise<RoleAccessValue[]>;
}
