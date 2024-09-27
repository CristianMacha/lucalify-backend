import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateCategoryDto } from '../aplication/dtos/create-category.dto';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { updateCategoryDto } from '../aplication/dtos/update-category.dto';
import { FilterCategoryDto } from '../aplication/dtos/filter-category.dto';
import { RegisterCategoryUseCase } from '../aplication/registerCategoryUseCase';
import { FilterCategoryUseCase } from '../aplication/filterCategoryUseCase';
import { UpdateCategoryUseCase } from '../aplication/updateCategoryUseCase';
import { ListActiveCategoriesUseCase } from '../aplication/listActiveCategoriesUseCase';

@ApiBearerAuth()
@ApiTags('Category')
@UseGuards(AuthGuard)
@Controller('category')
export class CategoryController {
  constructor(
    private readonly registerCategoryUseCase: RegisterCategoryUseCase,
    private readonly filterCategoryUseCase: FilterCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly listActiveCategoriesUseCase: ListActiveCategoriesUseCase,
  ) {}

  @Get('active')
  async listActiveCategories() {
    return await this.listActiveCategoriesUseCase.execute();
  }

  @Get('filter')
  async listCategory(@Query() filterCategoryDto: FilterCategoryDto) {
    return await this.filterCategoryUseCase.execute(filterCategoryDto);
  }

  @Post()
  async registerCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.registerCategoryUseCase.execute(createCategoryDto);
  }

  @Put(':id')
  async updateCategory(
    @Body() updateCategoryDto: updateCategoryDto,
    @Param('id') id: string,
  ) {
    return await this.updateCategoryUseCase.execute(id, updateCategoryDto);
  }
}
