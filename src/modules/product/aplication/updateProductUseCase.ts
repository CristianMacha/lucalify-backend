import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/product.repository';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CategoryRepository } from '../../category/domain/category.repository';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  public async execute(productId: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findProductById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const { name, description, price, code, categoryId, pricePurchase } =
      updateProductDto;
    const category = await this.categoryRepository.findCategoryById(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    if (!category.active) throw new Error('Category is not active');

    product.name = name;
    product.description = description;
    product.price = price;
    product.pricePurchase = pricePurchase;
    product.code = code;
    product.category = category;

    const updatedProduct = await this.productRepository.updateProduct(product);
    return updatedProduct;
  }
}
