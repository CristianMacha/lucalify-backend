import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { IdentityApisPeruRepository } from './infrastructure/identity.repository';
import { IdentityController } from './infrastructure/identity.controller';
import { GetIdentityByDniUseCase } from './aplication/getIdentityByDniUseCase';
import { GetIdentityByRucUseCase } from './aplication/getIdentityByRucUseCase';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [HttpModule],
  controllers: [IdentityController],
  providers: [
    GetIdentityByDniUseCase,
    GetIdentityByRucUseCase,
    JwtService,
    {
      provide: 'IdentityRepository',
      useClass: IdentityApisPeruRepository,
    },
  ],
})
export class IdentityModule {}
