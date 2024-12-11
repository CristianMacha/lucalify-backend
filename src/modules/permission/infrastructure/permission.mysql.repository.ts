import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, Repository } from 'typeorm';

import { Permission } from './permission.schema';
import { PermissionRepository } from '../domain/permission.repository';
import { PermissionValue } from '../domain/permission.value';

@Injectable()
export class PermissionMysqlRepository
  extends Repository<Permission>
  implements PermissionRepository
{
  constructor(private dataSource: DataSource) {
    super(Permission, dataSource.createEntityManager());
  }

  async registerPermission(
    permission: PermissionValue,
  ): Promise<PermissionValue> {
    const permissionCreated = this.create(permission);
    const permissionSaved = await this.save(permissionCreated);
    return plainToInstance(PermissionValue, permissionSaved);
  }

  async list(): Promise<PermissionValue[]> {
    const permissions = await this.find();
    return permissions.map((permission) =>
      plainToInstance(PermissionValue, permission),
    );
  }

  async findPermissionsByRoleId(roleId: string): Promise<PermissionValue[]> {
    const permissions = await this.createQueryBuilder('permission')
      .innerJoin('permission.rolePermissions', 'rolePermission')
      .innerJoin('rolePermission.role', 'role')
      .where('role.id = :roleId', { roleId })
      .getMany();

    return permissions.map((permission) =>
      plainToInstance(PermissionValue, permission),
    );
  }

  async findPermissionById(
    permissionId: string,
  ): Promise<PermissionValue | null> {
    const permission = await this.findOne({ where: { id: permissionId } });
    return permission ? plainToInstance(PermissionValue, permission) : null;
  }
}
