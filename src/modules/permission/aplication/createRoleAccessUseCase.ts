import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { RoleAccessRepository } from '../domain/role-access.repository';
import { CreateRoleAccessDto } from './dtos/create-role-access.dto';
import { AccessRepository } from '../domain/access.repository';
import { RoleRepository } from '../../role/domain/role.repository';
import { RoleAccessValue } from '../domain/role-access.value';

@Injectable()
export class CreateRoleAccessUseCase {
  constructor(
    @Inject('RoleAccessRepository')
    private readonly roleAccessRepository: RoleAccessRepository,
    @Inject('RoleRepository')
    private readonly roleRepository: RoleRepository,
    @Inject('AccessRepository')
    private readonly accessRepository: AccessRepository,
  ) {}

  public async execute(createRoleAccessDto: CreateRoleAccessDto) {
    const { roleId, accessId } = createRoleAccessDto;
    const role = await this.roleRepository.findRoleById(roleId);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    const access = await this.accessRepository.findById(accessId);
    if (!access) {
      throw new NotFoundException('Access not found');
    }

    const newRoleAccess = new RoleAccessValue(role, access);
    return await this.roleAccessRepository.register(newRoleAccess);
  }
}
