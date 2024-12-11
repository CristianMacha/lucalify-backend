import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RoleUseCase } from '../aplication/roleUseCase';
import { CreateRoleDto } from '../aplication/dtos/create-role.dto';
import { AuthGuard } from '../../../common/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('Role')
@UseGuards(AuthGuard)
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
