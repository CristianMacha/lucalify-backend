import { Inject, Injectable } from '@nestjs/common';
import { TradeRepository } from '../domain/trade.repository';
import { FilterTradeDto } from './dtos/filter-trade.dto';

@Injectable()
export class FilteredTradesUseCase {
  constructor(
    @Inject('TradeRepository')
    private readonly tradeRepository: TradeRepository,
  ) {}

  public async execute(filterTrade: FilterTradeDto) {
    return await this.tradeRepository.listFilteredTrade(filterTrade);
  }
}
