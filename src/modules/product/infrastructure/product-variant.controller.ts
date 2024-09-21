import { Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ProductVariantUseCase } from '../aplication/productVariantUseCase';
import { createProductVariantDto } from '../aplication/dtos/create-product-variant.dto';

@ApiBearerAuth()
@ApiTags('Product Variant')
@Controller('product-variant')
export class ProductVariantController {
  constructor(private readonly productVariantUseCase: ProductVariantUseCase) {}

  @Get()
  async listProductVariant() {
    return await this.productVariantUseCase.listProductVariant();
  }

  @Post()
  async registerProductVariant(
    createProductVariantDto: createProductVariantDto,
  ) {
    return await this.productVariantUseCase.registerProductVariant(
      createProductVariantDto,
    );
  }
}
