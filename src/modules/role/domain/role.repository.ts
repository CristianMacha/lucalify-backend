import { RoleValue } from './role.value';

export interface RoleRepository {
  findRoleById(id: string): Promise<RoleValue | null>;
  registerRole(role: RoleValue): Promise<RoleValue | null>;
  listRole(): Promise<RoleValue[]>;
}
