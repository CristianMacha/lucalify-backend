import { ResponseList } from '../../../common/interfaces/response.interface';
import { FilterCategoryDto } from '../aplication/dtos/filter-category.dto';
import { CategoryValue } from './category.value';

export interface CategoryRepository {
  findCategoryById(id: string): Promise<CategoryValue | null>;
  registerCategory(category: CategoryValue): Promise<CategoryValue | null>;
  listFilterCategories(
    filterCategoryDto: FilterCategoryDto,
  ): Promise<ResponseList<CategoryValue>>;
  listActiveCategories(): Promise<CategoryValue[]>;
  updateCategory(category: CategoryValue): Promise<CategoryValue | null>;
}
