import { Inject, Injectable } from '@nestjs/common';
import { SaleRepository } from '../domain/sale.repository';

@Injectable()
export class CreateSaleUseCase {
  constructor(
    @Inject('SaleRepository')
    private readonly saleRepository: SaleRepository,
  ) {}

  public async execute() {
    return 'Hello World!';
  }
}
