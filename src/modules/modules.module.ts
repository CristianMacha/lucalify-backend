import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { TenantModule } from './tenant/tenant.module';
import { BranchModule } from './branch/branch.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ClientModule } from './client/client.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IdentityModule } from './identity/identity.module';
import { TradeModule } from './trade/trade.module';
import { PrinterModule } from './printer/printer.module';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        timeout: +configService.get('HTTP_TIMEOUT'),
        maxRedirects: +configService.get('HTTP_MAX_REDIRECTS'),
      }),
    }),
    RoleModule,
    UserModule,
    TenantModule,
    BranchModule,
    ProductModule,
    CategoryModule,
    ClientModule,
    IdentityModule,
    TradeModule,
    PrinterModule,
  ],
})
export class ModulesModule {}
