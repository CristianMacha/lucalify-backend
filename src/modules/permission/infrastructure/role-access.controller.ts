import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { CreateRoleAccessUseCase } from '../aplication/createRoleAccessUseCase';
import { CreateRoleAccessDto } from '../aplication/dtos/create-role-access.dto';

@ApiBearerAuth()
@ApiTags('Role Access')
@UseGuards(AuthGuard)
@Controller('role-access')
export class RoleAccessController {
  constructor(
    private readonly createRoleAccessUseCase: CreateRoleAccessUseCase,
  ) {}

  @Post()
  async createRoleAccess(@Body() createRoleAccess: CreateRoleAccessDto) {
    return await this.createRoleAccessUseCase.execute(createRoleAccess);
  }
}
