import { Inject, Injectable } from '@nestjs/common';
import { TenantRepository } from '../domain/tenant.repository';
import { TenantValue } from '../domain/tenant.value';
import { CreateTenantDto } from './dtos/create-tenant.dto';

@Injectable()
export class TenantUseCase {
  constructor(
    @Inject('TenantRepository')
    private readonly tenantRepository: TenantRepository,
  ) {}

  public async registerTenant(createTenantDto: CreateTenantDto) {
    const { name, description, ruc } = createTenantDto;
    const newTenant = new TenantValue(name, ruc, description);
    const tenantCreated = await this.tenantRepository.registerTenant(newTenant);
    return tenantCreated;
  }

  public async listTenant() {
    return await this.tenantRepository.listTenant();
  }
}
