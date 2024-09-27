import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from './infrastructure/category.schema';
import { CategoryController } from './infrastructure/category.controller';
import { CategoryMysqlRepository } from './infrastructure/category.mysql.repository';
import { JwtService } from '@nestjs/jwt';
import { RegisterCategoryUseCase } from './aplication/registerCategoryUseCase';
import { FilterCategoryUseCase } from './aplication/filterCategoryUseCase';
import { UpdateCategoryUseCase } from './aplication/updateCategoryUseCase';
import { ListActiveCategoriesUseCase } from './aplication/listActiveCategoriesUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [
    JwtService,
    RegisterCategoryUseCase,
    FilterCategoryUseCase,
    ListActiveCategoriesUseCase,
    UpdateCategoryUseCase,
    {
      provide: 'CategoryRepository',
      useClass: CategoryMysqlRepository,
    },
  ],
})
export class CategoryModule {}
