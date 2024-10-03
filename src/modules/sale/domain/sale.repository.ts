import { ResponseList } from '../../../common/interfaces/response.interface';
import { CreateSale, FilterSale } from './sale.entity';
import { SaleValue } from './sale.value';

export interface SaleRepository {
  createSale(createSale: CreateSale): Promise<SaleValue | null>;
  listFilteredSale(filterSale: FilterSale): Promise<ResponseList<SaleValue>>;
  findSaleById(id: string): Promise<SaleValue | null>;
}
