import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './infrastructure/user.controller';
import { User } from './infrastructure/user.schema';
import { UserMysqlRepository } from './infrastructure/user.mysql.repository';
import { UserUseCase } from './aplication/userUseCase';
import { RoleMysqlRepository } from '../role/infrastructure/role.mysql.repository';
import { AuthController } from './infrastructure/auth.controller';
import { AuthUseCase } from './aplication/authUseCase';
import { AccessMysqlRepository } from '../permission/infrastructure/access.mysql.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
        global: true,
      }),
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [
    UserUseCase,
    AuthUseCase,
    {
      provide: 'UserRepository',
      useClass: UserMysqlRepository,
    },
    {
      provide: 'RoleRepository',
      useClass: RoleMysqlRepository,
    },
    {
      provide: 'AccessRepository',
      useClass: AccessMysqlRepository,
    },
  ],
})
export class UserModule {}
