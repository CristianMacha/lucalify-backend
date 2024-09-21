import { Inject, Injectable } from '@nestjs/common';
import { BranchRepository } from '../domain/branch.repository';
import { CreateBranchDto } from './dtos/create-branch.dto';
import { BranchValue } from '../domain/branch.value';
import { TenantRepository } from 'src/modules/tenant/domain/tenant.repository';

@Injectable()
export class BranchUseCase {
  constructor(
    @Inject('BranchRepository')
    private readonly branchRepository: BranchRepository,
    @Inject('TenantRepository')
    private readonly tenantRepository: TenantRepository,
  ) {}

  public async registerBranch(createBranchDto: CreateBranchDto) {
    const { name, description, tenantId } = createBranchDto;
    const tenant = await this.tenantRepository.findTenantById(tenantId);
    const newBranch = new BranchValue(name, tenant, description);
    const branchCreated = await this.branchRepository.registerBranch(newBranch);
    return branchCreated;
  }

  public async listBranch() {
    return await this.branchRepository.listBranch();
  }
}
