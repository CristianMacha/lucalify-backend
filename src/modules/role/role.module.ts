import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleMysqlRepository } from './infrastructure/role.mysql.repository';
import { RoleUseCase } from './aplication/roleUseCase';
import { RoleController } from './infrastructure/role.controller';
import { Role } from './infrastructure/role.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [
    JwtService,
    RoleUseCase,
    {
      provide: 'RoleRepository',
      useClass: RoleMysqlRepository,
    },
  ],
})
export class RoleModule {}
