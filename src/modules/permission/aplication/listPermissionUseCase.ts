import { Inject, Injectable } from '@nestjs/common';
import { PermissionRepository } from '../domain/permission.repository';

@Injectable()
export class ListPermissionUseCase {
  constructor(
    @Inject('PermissionRepository')
    private readonly permissionRepository: PermissionRepository,
  ) {}

  public async execute() {
    return await this.permissionRepository.list();
  }
}
