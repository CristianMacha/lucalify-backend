import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TenantUseCase } from '../aplication/tenantUseCase';
import { CreateTenantDto } from '../aplication/dtos/create-tenant.dto';

@ApiTags('Tenant')
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantUseCase: TenantUseCase) {}

  @Get()
  async listTenant() {
    return await this.tenantUseCase.listTenant();
  }

  @Post()
  async registerTenant(@Body() createTeanantDto: CreateTenantDto) {
    return await this.tenantUseCase.registerTenant(createTeanantDto);
  }
}
