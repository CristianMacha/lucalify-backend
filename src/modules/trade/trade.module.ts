import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Payment } from './infrastructure/payment.schema';
import { ClientMysqlRepository } from '../client/infrastructure/client.mysq.repository';
import { ProductMysqlRepository } from '../product/infrastructure/product.mysql.repository';
import { Trade } from './infrastructure/trade.schema';
import { ProductTrade } from './infrastructure/product-trade.schema';
import { TradeController } from './infrastructure/trade.controller';
import { CreateTradeUseCase } from './aplication/createTradeUseCase';
import { TradeMysqlRepository } from './infrastructure/trade.repository';
import { FilteredTradesUseCase } from './aplication/filteredTradesUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([Trade, Payment, ProductTrade])],
  controllers: [TradeController],
  providers: [
    CreateTradeUseCase,
    FilteredTradesUseCase,
    JwtService,
    {
      provide: 'TradeRepository',
      useClass: TradeMysqlRepository,
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
export class TradeModule {}
