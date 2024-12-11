import { v4 as uuid } from 'uuid';

import { AccessEntity } from './access.entity';
import { RoleAccessValue } from './role-access.value';

export class AccessValue implements AccessEntity {
  id: string;
  name: string;
  path: string;
  isActive: boolean;
  roleAccess: RoleAccessValue[];
  order: number;

  constructor(name: string, path: string) {
    this.id = uuid();
    this.name = name;
    this.path = path;
    this.isActive = true;
  }
}
