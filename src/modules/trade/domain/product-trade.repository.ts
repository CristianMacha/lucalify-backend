import { FilterProductTrade, ProductTradeValue } from './product-trade.value';

export interface ProductTradeRepository {
  findByRangeDate(
    filterProductTrade: FilterProductTrade,
  ): Promise<ProductTradeValue[]>;
}
