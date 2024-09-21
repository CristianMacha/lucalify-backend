import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/product.repository';
import { CategoryRepository } from '../../category/domain/category.repository';
import { ProductValue } from '../domain/product.value';

@Injectable()
export class ProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  public async registerProduct(createProductDto: any) {
    const { name, description, price, categoryId } = createProductDto;
    const category = await this.categoryRepository.findCategoryById(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    const newProduct = new ProductValue(name, description, price, category);
    const productCreated =
      await this.productRepository.registerProduct(newProduct);
    return productCreated;
  }

  public async listProduct() {
    return await this.productRepository.listProduct();
  }
}
