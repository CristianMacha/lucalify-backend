import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/product.repository';

@Injectable()
export class SearchProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  public async execute(value: string) {
    return await this.productRepository.searchProduct(value);
  }
}
