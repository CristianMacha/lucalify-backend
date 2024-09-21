import { UserEntity } from '../../user/domain/user.entity';

export interface RoleEntity {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  users: UserEntity[];
}
