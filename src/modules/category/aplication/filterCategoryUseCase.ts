import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../domain/category.repository';
import { FilterCategoryDto } from './dtos/filter-category.dto';

@Injectable()
export class FilterCategoryUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  public async execute(filterCategoryDto: FilterCategoryDto) {
    return await this.categoryRepository.listFilterCategories(
      filterCategoryDto,
    );
  }
}
