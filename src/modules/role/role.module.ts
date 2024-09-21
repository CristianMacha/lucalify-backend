import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleMysqlRepository } from './infrastructure/role.mysql.repository';
import { RoleUseCase } from './aplication/roleUseCase';
import { RoleController } from './infrastructure/role.controller';
import { Role } from './infrastructure/role.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [
    RoleUseCase,
    {
      provide: 'RoleRepository',
      useClass: RoleMysqlRepository,
    },
  ],
})
export class RoleModule {}
