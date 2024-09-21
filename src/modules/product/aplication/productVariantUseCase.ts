import { Inject, Injectable } from '@nestjs/common';
import { ProductVariantRepository } from '../domain/product-variant.repository';
import { ProductRepository } from '../domain/product.repository';
import { createProductVariantDto } from './dtos/create-product-variant.dto';
import { ProductVariantValue } from '../domain/product-variant.value';

@Injectable()
export class ProductVariantUseCase {
  constructor(
    @Inject('ProductVariantRepository')
    private readonly productVariantRepository: ProductVariantRepository,
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  public async registerProductVariant(
    createProductVariantDto: createProductVariantDto,
  ) {
    const { productId, price } = createProductVariantDto;
    const product = await this.productRepository.findProductById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const newProductVariant = new ProductVariantValue(price, product);
    const productVariantCreated =
      await this.productVariantRepository.registerProductVariant(
        newProductVariant,
      );
    return productVariantCreated;
  }

  public async listProductVariant() {
    return await this.productVariantRepository.listProductVariant();
  }
}
