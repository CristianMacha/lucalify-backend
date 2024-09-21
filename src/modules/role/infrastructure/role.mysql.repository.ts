import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../domain/role.repository';
import { Role } from './role.schema';
import { DataSource, Repository } from 'typeorm';
import { RoleValue } from '../domain/role.value';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RoleMysqlRepository
  extends Repository<Role>
  implements RoleRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  async registerRole(role: RoleValue): Promise<RoleValue | null> {
    const roleCreated = this.create(role);
    const roleSaved = await this.save(roleCreated);
    return plainToInstance(RoleValue, roleSaved);
  }

  async findRoleById(id: string): Promise<RoleValue | null> {
    const role = await this.findOne({ where: { id } });
    if (!role) return null;

    return plainToInstance(RoleValue, role);
  }

  async listRole(): Promise<RoleValue[]> {
    const roles = await this.find();
    return roles.map((role) => plainToInstance(RoleValue, role));
  }
}
