import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tenant } from './tenant.schema';
import { TenantRepository } from '../domain/tenant.repository';
import { TenantValue } from '../domain/tenant.value';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TenantMysqlRepository
  extends Repository<Tenant>
  implements TenantRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Tenant, dataSource.createEntityManager());
  }

  async registerTenant(tenant: TenantValue): Promise<TenantValue | null> {
    const tenantCreated = this.create(tenant);
    const tenantSaved = await this.save(tenantCreated);
    return plainToInstance(TenantValue, tenantSaved);
  }

  async findTenantById(id: string): Promise<TenantValue | null> {
    const tenant = await this.findOne({ where: { id } });
    if (!tenant) return null;

    return plainToInstance(TenantValue, tenant);
  }

  async listTenant(): Promise<TenantValue[]> {
    const tenants = await this.find();
    return tenants.map((tenant) => plainToInstance(TenantValue, tenant));
  }
}
