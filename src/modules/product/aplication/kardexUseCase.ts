import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/product.repository';
import { KardexFilterDto } from './dtos/kardex-filter.dto';

@Injectable()
export class KardexUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  public async execute(kardexFilter: KardexFilterDto) {
    return await this.productRepository.getKardex(kardexFilter);
  }
}
