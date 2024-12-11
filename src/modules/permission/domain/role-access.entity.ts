import { RoleEntity } from '../../role/domain/role.entity';
import { AccessEntity } from './access.entity';

export interface RoleAccessEntity {
  id: string;
  role: RoleEntity;
  access: AccessEntity;
}
