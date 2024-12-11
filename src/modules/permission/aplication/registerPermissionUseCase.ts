import { Inject, Injectable } from '@nestjs/common';

import { PermissionRepository } from '../domain/permission.repository';
import { CreatePermissionDto } from './dtos/create-permission.dto';
import { PermissionValue } from '../domain/permission.value';

@Injectable()
export class RegisterPermissionUseCase {
  constructor(
    @Inject('PermissionRepository')
    private readonly permissionRepository: PermissionRepository,
  ) {}

  public async execute(createPermission: CreatePermissionDto) {
    const { name, description } = createPermission;
    const permissionValue = new PermissionValue(name, description);
    return await this.permissionRepository.registerPermission(permissionValue);
  }
}
