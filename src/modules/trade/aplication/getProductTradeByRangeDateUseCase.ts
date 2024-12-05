import { Inject, Injectable } from '@nestjs/common';
import { ProductTradeRepository } from '../domain/product-trade.repository';
import { FilterProductTradeDto } from './dtos/filter-product-trade.dto';

@Injectable()
export class GetProductTradeByRangeDateUseCase {
  constructor(
    @Inject('ProductTradeRepository')
    private readonly productTradeRepository: ProductTradeRepository,
  ) {}

  public async execute(filterProductTrade: FilterProductTradeDto) {
    return await this.productTradeRepository.findByRangeDate(
      filterProductTrade,
    );
  }
}
