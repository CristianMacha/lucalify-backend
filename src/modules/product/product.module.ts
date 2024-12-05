import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { CategoryMysqlRepository } from '../category/infrastructure/category.mysql.repository';

import { Product } from './infrastructure/product.schema';
import { ProductController } from './infrastructure/product.controller';
import { ProductMysqlRepository } from './infrastructure/product.mysql.repository';

import { FilterProductUseCase } from './aplication/filterProductUseCase';
import { RegisterProductUseCase } from './aplication/registerProductUseCase';
import { UpdateProductUseCase } from './aplication/updateProductUseCase';
import { SearchProductUseCase } from './aplication/searchProductUseCase';
import { KardexUseCase } from './aplication/kardexUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [
    FilterProductUseCase,
    RegisterProductUseCase,
    UpdateProductUseCase,
    SearchProductUseCase,
    KardexUseCase,
    JwtService,
    {
      provide: 'ProductRepository',
      useClass: ProductMysqlRepository,
    },
    {
      provide: 'CategoryRepository',
      useClass: CategoryMysqlRepository,
    },
  ],
})
export class ProductModule {}
