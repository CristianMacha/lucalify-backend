import { ResponseList } from '../../../common/interfaces/response.interface';
import { FilterTrade } from './trade.entity';
import { FilterTradeReport, TradeValue } from './trade.value';

export interface TradeRepository {
  createTrade(trade: TradeValue): Promise<TradeValue | null>;
  listFilteredTrade(
    filterTrade: FilterTrade,
  ): Promise<ResponseList<TradeValue>>;
  findTradeById(id: string): Promise<TradeValue | null>;
  findByRangeDate(filterTradeReport: FilterTradeReport): Promise<TradeValue[]>;
  findByIdForTicket(id: string): Promise<TradeValue | null>;
}
