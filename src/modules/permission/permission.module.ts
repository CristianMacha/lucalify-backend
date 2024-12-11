import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionMysqlRepository } from './infrastructure/permission.mysql.repository';
import { RolePermissionMysqlRepository } from './infrastructure/role-permission.mysql.repository';
import { RoleMysqlRepository } from '../role/infrastructure/role.mysql.repository';
import { AccessMysqlRepository } from './infrastructure/access.mysql.repository';
import { RoleAccessMysqlRepository } from './infrastructure/role-access.mysql.repository';

import { Permission } from './infrastructure/permission.schema';
import { RolePermission } from './infrastructure/role-permission.schema';
import { Access } from './infrastructure/access.schema';
import { RoleAccess } from './infrastructure/role-access.schema';

import { RegisterPermissionUseCase } from './aplication/registerPermissionUseCase';
import { FindPermissionsByRoleIdUseCase } from './aplication/findPermissionsByRoleIdUseCase';
import { ListPermissionUseCase } from './aplication/listPermissionUseCase';
import { CreateRolePermissionUseCase } from './aplication/createRolePermissionUseCase';
import { CreateAccessUseCase } from './aplication/createAccessUseCase';
import { CreateRoleAccessUseCase } from './aplication/createRoleAccessUseCase';
import { FindAccessByRoleUseCase } from './aplication/findAccessByRoleUseCase';
import { FindAccessUseCase } from './aplication/findAccessUseCase';

import { PermissionController } from './infrastructure/permission.controller';
import { RolePermissionController } from './infrastructure/role-permission.controller';
import { RoleAccessController } from './infrastructure/role-access.controller';
import { AccessController } from './infrastructure/access.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission, RolePermission, Access, RoleAccess]),
  ],
  controllers: [
    PermissionController,
    RolePermissionController,
    AccessController,
    RoleAccessController,
  ],
  providers: [
    JwtService,
    RegisterPermissionUseCase,
    ListPermissionUseCase,
    FindPermissionsByRoleIdUseCase,
    CreateRolePermissionUseCase,
    CreateAccessUseCase,
    CreateRoleAccessUseCase,
    FindAccessByRoleUseCase,
    FindAccessUseCase,
    {
      provide: 'PermissionRepository',
      useClass: PermissionMysqlRepository,
    },
    {
      provide: 'RolePermissionRepository',
      useClass: RolePermissionMysqlRepository,
    },
    {
      provide: 'RoleRepository',
      useClass: RoleMysqlRepository,
    },
    {
      provide: 'AccessRepository',
      useClass: AccessMysqlRepository,
    },
    {
      provide: 'RoleAccessRepository',
      useClass: RoleAccessMysqlRepository,
    },
  ],
})
export class PermissionModule {}
