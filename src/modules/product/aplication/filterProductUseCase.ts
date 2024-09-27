import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/product.repository';
import { FilterProductDto } from './dtos/filter-product.dto';

@Injectable()
export class FilterProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  public async execute(filterProductDto: FilterProductDto) {
    return await this.productRepository.listProduct(filterProductDto);
  }
}
