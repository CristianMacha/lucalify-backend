import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Sale } from './infrastructure/sale.schema';
import { Payment } from './infrastructure/payment.schema';
import { ProductSale } from './infrastructure/product-sale.schema';
import { CreateSaleUseCase } from './aplication/createSaleUseCase';
import { SaleMysqlRepository } from './infrastructure/sale.repository';
import { ClientMysqlRepository } from '../client/infrastructure/client.mysq.repository';
import { ProductMysqlRepository } from '../product/infrastructure/product.mysql.repository';
import { SaleController } from './infrastructure/sale.controller';
import { FilteredSalesUseCase } from './aplication/filteredSalesUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Payment, ProductSale])],
  controllers: [SaleController],
  providers: [
    CreateSaleUseCase,
    FilteredSalesUseCase,
    JwtService,
    {
      provide: 'SaleRepository',
      useClass: SaleMysqlRepository,
    },
    {
      provide: 'ProductRepository',
      useClass: ProductMysqlRepository,
    },
    {
      provide: 'ClientRepository',
      useClass: ClientMysqlRepository,
    },
  ],
})
export class SaleModule {}
