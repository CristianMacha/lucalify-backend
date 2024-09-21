import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Branch } from './branch.schema';
import { BranchRepository } from '../domain/branch.repository';
import { BranchValue } from '../domain/branch.value';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BranchMysqlRepository
  extends Repository<Branch>
  implements BranchRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Branch, dataSource.createEntityManager());
  }

  async registerBranch(branch: BranchValue): Promise<BranchValue | null> {
    const branchCreated = this.create(branch);
    const branchSaved = await this.save(branchCreated);
    return plainToInstance(BranchValue, branchSaved);
  }

  async findBranchById(id: string): Promise<BranchValue | null> {
    const branch = await this.findOne({ where: { id } });
    if (!branch) return null;
    return plainToInstance(BranchValue, branch);
  }

  async listBranch(): Promise<BranchValue[]> {
    const branches = await this.find();
    return branches.map((branch) => plainToInstance(BranchValue, branch));
  }
}
