import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './infrastructure/branch.schema';
import { BranchController } from './infrastructure/branch.controller';
import { BranchUseCase } from './aplication/branchUseCase';
import { BranchMysqlRepository } from './infrastructure/branch.mysql.repository';
import { TenantMysqlRepository } from '../tenant/infrastructure/tenant.mysql.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Branch])],
  controllers: [BranchController],
  providers: [
    BranchUseCase,
    {
      provide: 'BranchRepository',
      useClass: BranchMysqlRepository,
    },
    {
      provide: 'TenantRepository',
      useClass: TenantMysqlRepository,
    },
  ],
})
export class BranchModule {}
