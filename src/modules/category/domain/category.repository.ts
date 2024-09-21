import { CategoryValue } from './category.value';

export interface CategoryRepository {
  findCategoryById(id: string): Promise<CategoryValue | null>;
  registerCategory(category: CategoryValue): Promise<CategoryValue | null>;
  listCategory(): Promise<CategoryValue[]>;
}
