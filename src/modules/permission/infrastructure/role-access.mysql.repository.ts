import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, Repository } from 'typeorm';

import { RoleAccess } from './role-access.schema';
import { RoleAccessRepository } from '../domain/role-access.repository';
import { RoleAccessValue } from '../domain/role-access.value';

@Injectable()
export class RoleAccessMysqlRepository
  extends Repository<RoleAccess>
  implements RoleAccessRepository
{
  constructor(private dataSource: DataSource) {
    super(RoleAccess, dataSource.createEntityManager());
  }

  public async register(roleAccess: RoleAccessValue): Promise<RoleAccessValue> {
    const roleAccessCreated = await this.save(roleAccess);
    return plainToInstance(RoleAccessValue, roleAccessCreated);
  }

  public async list(): Promise<RoleAccessValue[]> {
    const roleAccess = await this.find();
    return roleAccess.map((roleAccess) =>
      plainToInstance(RoleAccessValue, roleAccess),
    );
  }
}
