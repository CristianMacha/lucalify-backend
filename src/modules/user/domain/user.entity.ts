import { RoleEntity } from '../../role/domain/role.entity';

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  active: boolean;
  deleted: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  role: RoleEntity | null;
}
