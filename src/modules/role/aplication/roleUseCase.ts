import { Inject, Injectable } from '@nestjs/common';

import { RoleRepository } from '../domain/role.repository';
import { RoleValue } from '../domain/role.value';
import { CreateRoleDto } from './dtos/create-role.dto';

@Injectable()
export class RoleUseCase {
  constructor(
    @Inject('RoleRepository') private readonly roleRepository: RoleRepository,
  ) {}

  public async registerRole(createRoleDto: CreateRoleDto) {
    const { name, description } = createRoleDto;
    const userValue = new RoleValue(name, description);
    const userCreated = await this.roleRepository.registerRole(userValue);
    return userCreated;
  }

  public async listRole() {
    return await this.roleRepository.listRole();
  }
}
