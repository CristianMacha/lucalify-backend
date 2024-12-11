import { AccessValue } from './access.value';

export interface AccessRepository {
  register(access: AccessValue): Promise<AccessValue>;
  list(): Promise<AccessValue[]>;
  findById(id: string): Promise<AccessValue | null>;
  findByRoleId(roleId: string): Promise<AccessValue[]>;
}
