import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { RolePermission } from './role-permission.schema';
import { RolePermissionRepository } from '../domain/role-permission.repository';
import { RolePermissionValue } from '../domain/role-permission.value';

@Injectable()
export class RolePermissionMysqlRepository
  extends Repository<RolePermission>
  implements RolePermissionRepository
{
  constructor(private dataSource: DataSource) {
    super(RolePermission, dataSource.createEntityManager());
  }

  async registerRolePermission(
    rolePermission: RolePermissionValue,
  ): Promise<RolePermissionValue> {
    const rolePermissionCreated = this.create(rolePermission);
    const rolePermissionSaved = await this.save(rolePermissionCreated);
    return plainToInstance(RolePermissionValue, rolePermissionSaved);
  }
}
