import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Access } from './access.schema';
import { AccessRepository } from '../domain/access.repository';
import { AccessValue } from '../domain/access.value';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AccessMysqlRepository
  extends Repository<Access>
  implements AccessRepository
{
  constructor(private dataSource: DataSource) {
    super(Access, dataSource.createEntityManager());
  }

  public async register(access: AccessValue): Promise<AccessValue> {
    const accessCreated = this.create(access);
    return await this.save(accessCreated);
  }

  public async list(): Promise<AccessValue[]> {
    return await this.find();
  }

  public async findByRoleId(roleId: string): Promise<AccessValue[]> {
    const access = await this.createQueryBuilder('access')
      .innerJoin('access.roleAccess', 'roleAccess')
      .innerJoin('roleAccess.role', 'role')
      .where('role.id = :roleId', { roleId })
      .orderBy('access.order', 'ASC')
      .getMany();

    return access.map((access) => plainToInstance(AccessValue, access));
  }

  public async findById(accessId: string): Promise<AccessValue | null> {
    const access = await this.findOne({ where: { id: accessId } });
    return access ? plainToInstance(AccessValue, access) : null;
  }
}
