import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RoleUseCase } from '../aplication/roleUseCase';
import { CreateRoleDto } from '../aplication/dtos/create-role.dto';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleUseCase: RoleUseCase) {}

  @Post()
  async registerRole(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleUseCase.registerRole(createRoleDto);
  }

  @Get()
  async listRole() {
    return await this.roleUseCase.listRole();
  }
}
