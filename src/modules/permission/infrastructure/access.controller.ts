import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../../../common/guards/auth.guard';
import { CreateAccessUseCase } from '../aplication/createAccessUseCase';
import { FindAccessUseCase } from '../aplication/findAccessUseCase';
import { FindAccessByRoleUseCase } from '../aplication/findAccessByRoleUseCase';
import { CreateAccessDto } from '../aplication/dtos/create-access.dto';

@ApiBearerAuth()
@ApiTags('Access')
@UseGuards(AuthGuard)
@Controller('access')
export class AccessController {
  constructor(
    private readonly createAccessUseCase: CreateAccessUseCase,
    private readonly findAccessUseCase: FindAccessUseCase,
    private readonly findAccessByRoleUseCase: FindAccessByRoleUseCase,
  ) {}

  @Post()
  async createAccess(@Body() createAccess: CreateAccessDto) {
    return await this.createAccessUseCase.execute(createAccess);
  }

  @Get()
  async findAccess() {
    return await this.findAccessUseCase.execute();
  }

  @Get('role/:roleId')
  async findAccessByRole(@Param('roleId') roleId: string) {
    return await this.findAccessByRoleUseCase.execute(roleId);
  }
}
