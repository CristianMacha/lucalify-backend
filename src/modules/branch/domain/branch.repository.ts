import { BranchValue } from './branch.value';

export interface BranchRepository {
  findBranchById(id: string): Promise<BranchValue | null>;
  registerBranch(branch: BranchValue): Promise<BranchValue | null>;
  listBranch(): Promise<BranchValue[]>;
}
