import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/product.repository';
import { CategoryRepository } from '../../category/domain/category.repository';
import { ProductValue } from '../domain/product.value';
import { CreateProductDto } from './dtos/create-product.dto';
import { Payload } from '../../../common/interfaces/auth.interface';

@Injectable()
export class RegisterProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  public async execute(createProductDto: CreateProductDto, payload: Payload) {
    const { name, description, price, stock, code, categoryId, pricePurchase } =
      createProductDto;
    const category = await this.getCategoryById(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    const newProduct = new ProductValue(
      name,
      description,
      price,
      pricePurchase,
      code,
      stock,
      category,
      payload.name,
      payload.name,
    );
    const productCreated =
      await this.productRepository.registerProduct(newProduct);
    return productCreated;
  }

  private getCategoryById(categoryId: string) {
    return this.categoryRepository.findCategoryById(categoryId);
  }
}
