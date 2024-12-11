import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateRolePermissionUseCase } from '../aplication/createRolePermissionUseCase';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { CreateRolePermissionDto } from '../aplication/dtos/create-role-permission.dto';

@ApiBearerAuth()
@ApiTags('Role Permission')
@UseGuards(AuthGuard)
@Controller('role-permission')
export class RolePermissionController {
  constructor(
    private readonly createRolePermissionUseCase: CreateRolePermissionUseCase,
  ) {}

  @Post()
  async createRolePermission(
    @Body() createRolePermission: CreateRolePermissionDto,
  ) {
    return await this.createRolePermissionUseCase.execute(createRolePermission);
  }
}
