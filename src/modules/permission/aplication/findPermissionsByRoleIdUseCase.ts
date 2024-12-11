import { Inject, Injectable } from '@nestjs/common';
import { PermissionRepository } from '../domain/permission.repository';

@Injectable()
export class FindPermissionsByRoleIdUseCase {
  constructor(
    @Inject('PermissionRepository')
    private readonly permissionRepository: PermissionRepository,
  ) {}

  public async execute(roleId: string) {
    return await this.permissionRepository.findPermissionsByRoleId(roleId);
  }
}
