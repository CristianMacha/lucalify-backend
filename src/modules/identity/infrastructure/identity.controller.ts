import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { GetIdentityByDniUseCase } from '../aplication/getIdentityByDniUseCase';
import { GetIdentityByRucUseCase } from '../aplication/getIdentityByRucUseCase';

@ApiBearerAuth()
@ApiTags('Identity')
@UseGuards(AuthGuard)
@Controller('identity')
export class IdentityController {
  constructor(
    private readonly getIdentityByDniUseCase: GetIdentityByDniUseCase,
    private readonly getIdentityByRucUseCase: GetIdentityByRucUseCase,
  ) {}

  @Get('dni/:dni')
  async getIdentityByDni(@Param('dni') dni: string) {
    return await this.getIdentityByDniUseCase.execute(dni);
  }

  @Get('ruc/:ruc')
  async getIdentityByRuc(@Param('ruc') ruc: string) {
    return await this.getIdentityByRucUseCase.execute(ruc);
  }
}
