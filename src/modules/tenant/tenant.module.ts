import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './infrastructure/tenant.schema';
import { TenantController } from './infrastructure/tenant.controller';
import { TenantUseCase } from './aplication/tenantUseCase';
import { TenantMysqlRepository } from './infrastructure/tenant.mysql.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  controllers: [TenantController],
  providers: [
    TenantUseCase,
    {
      provide: 'TenantRepository',
      useClass: TenantMysqlRepository,
    },
  ],
})
export class TenantModule {}
