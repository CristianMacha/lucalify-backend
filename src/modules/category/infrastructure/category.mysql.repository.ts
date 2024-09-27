import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Category } from './category.schema';
import { CategoryRepository } from '../domain/category.repository';
import { CategoryValue } from '../domain/category.value';
import { plainToInstance } from 'class-transformer';
import { FilterCategoryDto } from '../aplication/dtos/filter-category.dto';
import { ResponseList } from '../../../common/interfaces/response.interface';

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

  async listActiveCategories(): Promise<CategoryValue[]> {
    const categories = await this.find({
      where: { active: true },
      order: { updatedAt: 'DESC' },
    });
    return categories.map((category) =>
      plainToInstance(CategoryValue, category),
    );
  }

  async listFilterCategories(
    filterCategoryDto: FilterCategoryDto,
  ): Promise<ResponseList<CategoryValue>> {
    const { textSearch, page, perPage } = filterCategoryDto;

    const query = this.createQueryBuilder('category');

    if (textSearch) {
      query.where(
        'category.name LIKE :textSearch OR category.description LIKE :textSearch',
        { textSearch: `%${textSearch}%` },
      );
    }

    query.orderBy('category.createdAt', 'DESC');
    query.skip((page - 1) * perPage).take(perPage);

    const totalItems = await query.getCount();
    const totalPages = Math.ceil(totalItems / perPage);
    const categories = await query.getMany();

    return {
      data: categories.map((category) =>
        plainToInstance(CategoryValue, category),
      ),
      totalItems,
      totalPages,
      currentPage: page,
      perPage,
    };
  }

  async findCategoryById(id: string): Promise<CategoryValue | null> {
    const category = await this.findOne({ where: { id } });
    if (!category) return null;

    return plainToInstance(CategoryValue, category);
  }

  async updateCategory(category: CategoryValue): Promise<CategoryValue | null> {
    const categoryUpdated = await this.save(category);
    return plainToInstance(CategoryValue, categoryUpdated);
  }
}
