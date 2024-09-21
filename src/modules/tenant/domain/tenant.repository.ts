import { TenantValue } from './tenant.value';

export interface TenantRepository {
  findTenantById(id: string): Promise<TenantValue | null>;
  registerTenant(tenant: TenantValue): Promise<TenantValue | null>;
  listTenant(): Promise<TenantValue[]>;
}
