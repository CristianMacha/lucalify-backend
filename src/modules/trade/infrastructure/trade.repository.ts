import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Trade } from './trade.schema';
import { ResponseList } from '../../../common/interfaces/response.interface';
import { plainToInstance } from 'class-transformer';
import { Product } from '../../product/infrastructure/product.schema';
import { Client } from '../../client/infrastructure/client.schema';
import { ProductTrade } from './product-trade.schema';
import { TradeRepository } from '../domain/trade.repository';
import { FilterTradeReport, TradeValue } from '../domain/trade.value';
import { FilterTrade, TradeType } from '../domain/trade.entity';
import { add } from 'date-fns';

@Injectable()
export class TradeMysqlRepository
  extends Repository<Trade>
  implements TradeRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Trade, dataSource.createEntityManager());
  }

  async createTrade(trade: TradeValue): Promise<TradeValue | null> {
    return await this.dataSource.transaction(async (manager) => {
      const { productTrades, client, ...onlyTrade } = trade;
      const newTrade = manager.create(Trade, onlyTrade);
      if (client) {
        newTrade.client = plainToInstance(Client, client);
      }

      const tradeCreated = await manager.save(Trade, newTrade);
      // for await (const payment of payments) {
      //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //   const { sale, ...onlyPayment } = payment;
      //   const newPayment = manager.create(Payment, onlyPayment);
      //   await manager.save(newPayment);
      // }

      for await (const productTrade of productTrades) {
        const product = plainToInstance(Product, productTrade.product);
        if (onlyTrade.type === TradeType.SALE) {
          product.stock -= productTrade.quantity;
        } else {
          product.stock += productTrade.quantity;
          product.price = productTrade.price;
        }
        const newProductTrade = manager.create(ProductTrade);
        newProductTrade.id = productTrade.id;
        newProductTrade.trade = tradeCreated;
        newProductTrade.product = product;
        newProductTrade.quantity = productTrade.quantity;
        newProductTrade.price = productTrade.price;
        newProductTrade.createdBy = productTrade.createdBy;
        newProductTrade.updatedBy = productTrade.updatedBy;
        newProductTrade.createdAt = productTrade.createdAt;
        newProductTrade.updatedAt = productTrade.updatedAt;
        await manager.save(newProductTrade);
        await manager.save(product);
      }

      return plainToInstance(TradeValue, tradeCreated);
    });
  }

  async listFilteredTrade(
    filterTrade: FilterTrade,
  ): Promise<ResponseList<TradeValue>> {
    const { textSearch, page, perPage, fromDate, toDate, type } = filterTrade;
    const query = this.createQueryBuilder('trade');
    query.leftJoinAndSelect('trade.client', 'client');
    query.where('trade.total > 0');
    query.andWhere('trade.type = :type', { type });

    if (textSearch) {
      query.andWhere(
        'client.name LIKE :textSearch OR client.documentNumber LIKE :textSearch',
        { textSearch: `%${textSearch}%` },
      );
    }

    if (fromDate && toDate) {
      query.andWhere('trade.createdAt BETWEEN :fromDate AND :toDate', {
        fromDate,
        toDate,
      });
    }

    query.orderBy('trade.createdAt', 'DESC');
    query.skip((page - 1) * perPage).take(perPage);

    const totalItems = await query.getCount();
    const totalPages = Math.ceil(totalItems / perPage);
    const trades = await query.getMany();
    return {
      data: trades.map((trade) => plainToInstance(TradeValue, trade)),
      totalItems,
      totalPages,
      currentPage: page,
      perPage,
    };
  }

  async findTradeById(id: string): Promise<TradeValue | null> {
    const trade = await this.findOne({
      where: { id },
      relations: ['client', 'productTrades', 'productTrades.product'],
    });
    if (!trade) return null;
    return plainToInstance(TradeValue, trade);
  }

  async findByRangeDate(
    filterTradeReport: FilterTradeReport,
  ): Promise<TradeValue[]> {
    const { startDate, endDate, tradeType } = filterTradeReport;
    const adjustedEndDate = add(endDate, { days: 1 });
    const query = this.createQueryBuilder('trade');
    query.where('trade.type = :tradeType', { tradeType });
    query.andWhere('trade.createdAt BETWEEN :startDate AND :endDate', {
      startDate,
      endDate: adjustedEndDate,
    });
    const trades = await query.getMany();
    return trades.map((trade) => plainToInstance(TradeValue, trade));
  }

  async findByIdForTicket(id: string): Promise<TradeValue | null> {
    const trade = await this.findOne({
      where: { id },
      relations: ['client', 'productTrades', 'productTrades.product'],
    });
    if (!trade) return null;
    return plainToInstance(TradeValue, trade);
  }
}
