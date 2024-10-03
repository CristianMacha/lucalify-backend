import { IdentityDni } from './identity-dni.entity';
import { IdentityRuc } from './identity-ruc.entity';

export interface IdentityRepository {
  getByDni(dni: string): Promise<IdentityDni>;
  getByRuc(ruc: string): Promise<IdentityRuc>;
}
