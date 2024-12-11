import { v4 as uuid } from 'uuid';

import { RoleAccessEntity } from './role-access.entity';
import { AccessValue } from './access.value';
import { RoleValue } from '../../role/domain/role.value';

export class RoleAccessValue implements RoleAccessEntity {
  id: string;
  role: RoleValue;
  access: AccessValue;

  constructor(role: RoleValue, access: AccessValue) {
    this.id = uuid();
    this.role = role;
    this.access = access;
  }
}
