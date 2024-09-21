import { RoleEntity } from './role.entity';
import { v4 as uuid } from 'uuid';
import { UserValue } from '../../user/domain/user.value';

export class RoleValue implements RoleEntity {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  users: UserValue[];

  constructor(name: string, description?: string) {
    this.id = uuid();
    this.name = name;
    this.description = description || '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
