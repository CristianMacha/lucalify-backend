import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../domain/category.repository';
import { updateCategoryDto } from './dtos/update-category.dto';
import { CategoryValue } from '../domain/category.value';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  public async execute(categoryId: string, updateCategory: updateCategoryDto) {
    const { name, description, active } = updateCategory;
    const categoryDb = await this.findCategoryById(categoryId);
    if (!categoryDb) return null;

    categoryDb.name = name;
    categoryDb.description = description;
    categoryDb.active = active;
    const categoryUpdated =
      await this.categoryRepository.updateCategory(categoryDb);
    return categoryUpdated;
  }

  private async findCategoryById(categoryId: string): Promise<CategoryValue> {
    return await this.categoryRepository.findCategoryById(categoryId);
  }
}
