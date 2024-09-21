import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductUseCase } from '../aplication/productUseCase';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../aplication/dtos/create-product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) {}

  @Get()
  async listProduct() {
    return await this.productUseCase.listProduct();
  }

  @Post()
  async registerProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productUseCase.registerProduct(createProductDto);
  }
}
