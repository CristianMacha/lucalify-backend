import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../../../common/guards/auth.guard';
import { RegisterPermissionUseCase } from '../aplication/registerPermissionUseCase';
import { ListPermissionUseCase } from '../aplication/listPermissionUseCase';
import { FindPermissionsByRoleIdUseCase } from '../aplication/findPermissionsByRoleIdUseCase';
import { CreatePermissionDto } from '../aplication/dtos/create-permission.dto';

@ApiBearerAuth()
@ApiTags('Permission')
@UseGuards(AuthGuard)
@Controller('permission')
export class PermissionController {
  constructor(
    private readonly registerPermissionUseCase: RegisterPermissionUseCase,
    private readonly listPermissionUseCase: ListPermissionUseCase,
    private readonly findPermissionsByRoleIdUseCase: FindPermissionsByRoleIdUseCase,
  ) {}

  @Post()
  async registerPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return await this.registerPermissionUseCase.execute(createPermissionDto);
  }

  @Get()
  async listPermission() {
    return await this.listPermissionUseCase.execute();
  }

  @Get('role/:roleId')
  async findPermissionsByRoleId(@Param('roleId') roleId: string) {
    return await this.findPermissionsByRoleIdUseCase.execute(roleId);
  }
}
