import { Inject, Injectable } from '@nestjs/common';
import { SaleRepository } from '../domain/sale.repository';
import { FilterSaleDto } from './dtos/filter-sale.dto';

@Injectable()
export class FilteredSalesUseCase {
  constructor(
    @Inject('SaleRepository')
    private readonly saleRepository: SaleRepository,
  ) {}

  public async execute(filterSale: FilterSaleDto) {
    return await this.saleRepository.listFilteredSale(filterSale);
  }
}
