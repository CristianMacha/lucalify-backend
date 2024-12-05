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
import { PrinterModule } from '../printer/printer.module';
import { ReportTradeByRangeDateUseCase } from './aplication/reportTradeByRangeDateUseCase';
import { TradeTicketUseCase } from './aplication/tradeTicketUseCase';
import { GetTradeByIdUseCase } from './aplication/getTradeByIdUseCase';
import { ProductTradeMysqlRepository } from './infrastructure/product-trade.repository';
import { GetProductTradeByRangeDateUseCase } from './aplication/getProductTradeByRangeDateUseCase';
import { ProductTradeController } from './infrastructure/product-trade.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trade, Payment, ProductTrade]),
    PrinterModule,
  ],
  controllers: [TradeController, ProductTradeController],
  providers: [
    CreateTradeUseCase,
    FilteredTradesUseCase,
    ReportTradeByRangeDateUseCase,
    TradeTicketUseCase,
    GetTradeByIdUseCase,
    GetProductTradeByRangeDateUseCase,
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
    {
      provide: 'ProductTradeRepository',
      useClass: ProductTradeMysqlRepository,
    },
  ],
})
export class TradeModule {}
