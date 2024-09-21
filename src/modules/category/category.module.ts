import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from './infrastructure/category.schema';
import { CategoryController } from './infrastructure/category.controller';
import { CategoryUseCase } from './aplication/categoryUseCase';
import { CategoryMysqlRepository } from './infrastructure/category.mysql.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [
    CategoryUseCase,
    {
      provide: 'CategoryRepository',
      useClass: CategoryMysqlRepository,
    },
  ],
})
export class CategoryModule {}
