import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Category } from './category.schema';
import { CategoryRepository } from '../domain/category.repository';
import { CategoryValue } from '../domain/category.value';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CategoryMysqlRepository
  extends Repository<Category>
  implements CategoryRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async registerCategory(
    categoryValue: CategoryValue,
  ): Promise<CategoryValue | null> {
    const categoryCreated = this.create(categoryValue);
    const categorySaved = await this.save(categoryCreated);
    return plainToInstance(CategoryValue, categorySaved);
  }

  async listCategory(): Promise<CategoryValue[]> {
    const categories = await this.find();
    return categories.map((category) =>
      plainToInstance(CategoryValue, category),
    );
  }

  async findCategoryById(id: string): Promise<CategoryValue | null> {
    const category = await this.findOne({ where: { id } });
    if (!category) return null;

    return plainToInstance(CategoryValue, category);
  }
}
