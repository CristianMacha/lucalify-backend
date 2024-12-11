import { Inject, Injectable } from '@nestjs/common';

import { RolePermissionRepository } from '../domain/role-permission.repository';
import { RoleRepository } from '../../role/domain/role.repository';
import { PermissionRepository } from '../domain/permission.repository';
import { CreateRolePermissionDto } from './dtos/create-role-permission.dto';
import { RolePermissionValue } from '../domain/role-permission.value';

@Injectable()
export class CreateRolePermissionUseCase {
  constructor(
    @Inject('RolePermissionRepository')
    private readonly rolePermissionRepository: RolePermissionRepository,
    @Inject('RoleRepository')
    private readonly roleRepository: RoleRepository,
    @Inject('PermissionRepository')
    private readonly permissionRepository: PermissionRepository,
  ) {}

  public async execute(createRolePermission: CreateRolePermissionDto) {
    const { roleId, permissionId } = createRolePermission;

    const role = await this.roleRepository.findRoleById(roleId);
    if (!role) {
      throw new Error('Role not found');
    }

    const permission =
      await this.permissionRepository.findPermissionById(permissionId);
    if (!permission) {
      throw new Error('Permission not found');
    }

    const newRolePermission = new RolePermissionValue(role, permission);
    return await this.rolePermissionRepository.registerRolePermission(
      newRolePermission,
    );
  }
}
