import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { UserEntity } from './user.entity';
import { RoleValue } from '../../role/domain/role.value';
import { AccessValue } from '../../permission/domain/access.value';

export class UserValue implements UserEntity {
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
  role: RoleValue;

  constructor(
    name: string,
    email: string,
    password: string,
    createdBy: string,
    role: RoleValue,
  ) {
    this.id = uuid();
    this.name = name;
    this.email = email;
    this.password = password;
    this.active = true;
    this.deleted = false;
    this.createdBy = createdBy;
    this.updatedBy = createdBy;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.role = role;
  }

  static async create(
    name: string,
    email: string,
    plainPassword: string,
    role: RoleValue,
  ): Promise<UserValue> {
    const saltOrRounds = 10;
    const hashedPassword = bcrypt.hashSync(plainPassword, saltOrRounds);
    return new UserValue(name, email, hashedPassword, 'admin', role);
  }
}

export interface AuthMeResponse {
  user: UserValue;
  access: AccessValue[];
}
