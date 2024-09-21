import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryMysqlRepository } from '../category/infrastructure/category.mysql.repository';

import { Product } from './infrastructure/product.schema';
import { ProductController } from './infrastructure/product.controller';
import { ProductMysqlRepository } from './infrastructure/product.mysql.repository';
import { AttributeController } from './infrastructure/attribute.controller';
import { Attribute } from './infrastructure/attribute.schema';
import { AttributeValueController } from './infrastructure/attribute-value.controller';
import { AttributeValueMysqlRepository } from './infrastructure/attribute-value.msql.repository';
import { ProductVariantController } from './infrastructure/product-variant.controller';
import { ProductVariantMysqlRepository } from './infrastructure/product-variant.mysq.repository';
import { AttributeValue } from './infrastructure/attribute-value.schema';
import { ProductVariant } from './infrastructure/product-variant.schema';
import { ProductVariantAttribute } from './infrastructure/product-variant-attribute.schema';

import { ProductUseCase } from './aplication/productUseCase';
import { AttributeUseCase } from './aplication/attributeUseCase';
import { AttributeValueUseCase } from './aplication/attributeValueUseCase';
import { ProductVariantUseCase } from './aplication/productVariantUseCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Attribute,
      AttributeValue,
      ProductVariant,
      ProductVariantAttribute,
    ]),
  ],
  controllers: [
    ProductController,
    AttributeController,
    AttributeValueController,
    ProductVariantController,
  ],
  providers: [
    ProductUseCase,
    AttributeUseCase,
    AttributeValueUseCase,
    ProductVariantUseCase,
    {
      provide: 'ProductRepository',
      useClass: ProductMysqlRepository,
    },
    {
      provide: 'CategoryRepository',
      useClass: CategoryMysqlRepository,
    },
    {
      provide: 'AttributeValueRepository',
      useClass: AttributeValueMysqlRepository,
    },
    {
      provide: 'ProductVariantRepository',
      useClass: ProductVariantMysqlRepository,
    },
  ],
})
export class ProductModule {}
