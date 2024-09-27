import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../domain/category.repository';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoryValue } from '../domain/category.value';

@Injectable()
export class RegisterCategoryUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  public async execute(createCategoryDto: CreateCategoryDto) {
    const { name, description } = createCategoryDto;
    const newCategory = new CategoryValue(name, description);
    const categoryCreated =
      await this.categoryRepository.registerCategory(newCategory);
    return categoryCreated;
  }
}
