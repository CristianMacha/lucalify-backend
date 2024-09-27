import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { TenantModule } from './tenant/tenant.module';
import { BranchModule } from './branch/branch.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    RoleModule,
    UserModule,
    TenantModule,
    BranchModule,
    ProductModule,
    CategoryModule,
    ClientModule,
  ],
})
export class ModulesModule {}
