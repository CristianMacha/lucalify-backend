import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryUseCase } from '../aplication/categoryUseCase';
import { CreateCategoryDto } from '../aplication/dtos/create-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoyUseCase: CategoryUseCase) {}

  @Get()
  async listCategory() {
    return await this.categoyUseCase.listCategory();
  }

  @Post()
  async registerCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoyUseCase.registerCategory(createCategoryDto);
  }
}
