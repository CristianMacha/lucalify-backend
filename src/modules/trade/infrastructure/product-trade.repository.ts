import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductTrade } from './product-trade.schema';
import { ProductTradeRepository } from '../domain/product-trade.repository';
import {
  FilterProductTrade,
  ProductTradeValue,
} from '../domain/product-trade.value';
import { add } from 'date-fns';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductTradeMysqlRepository
  extends Repository<ProductTrade>
  implements ProductTradeRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(ProductTrade, dataSource.createEntityManager());
  }

  public async findByRangeDate(
    filterProductTrade: FilterProductTrade,
  ): Promise<ProductTradeValue[]> {
    const { startDate, endDate, textSearch } = filterProductTrade;
    const adjustedEndDate = add(endDate, { days: 1 });
    const query = this.createQueryBuilder('productTrade')
      .leftJoinAndSelect('productTrade.product', 'product')
      .leftJoinAndSelect('productTrade.trade', 'trade')
      .leftJoinAndSelect('product.category', 'category')
      .where('productTrade.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate: adjustedEndDate,
      });

    if (textSearch) {
      query.andWhere(
        'product.name LIKE :textSearch OR product.code LIKE :textSearch',
        {
          textSearch: `%${textSearch}%`,
        },
      );
    }

    const productTrades = await query.getMany();
    return productTrades.map((productTrade) =>
      plainToInstance(ProductTradeValue, productTrade),
    );
  }
}
