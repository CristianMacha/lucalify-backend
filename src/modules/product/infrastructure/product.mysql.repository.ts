import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Product } from './product.schema';
import { ProductRepository } from '../domain/product.repository';
import { plainToInstance } from 'class-transformer';
import { ProductValue } from '../domain/product.value';
import { FilterProductDto } from '../aplication/dtos/filter-product.dto';
import { ResponseList } from '../../../common/interfaces/response.interface';

@Injectable()
export class ProductMysqlRepository
  extends Repository<Product>
  implements ProductRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async registerProduct(product: ProductValue) {
    const productCreated = this.create(product);
    const productSaved = await this.save(productCreated);
    return plainToInstance(ProductValue, productSaved);
  }

  async findProductById(id: string): Promise<ProductValue | null> {
    const product = await this.findOne({ where: { id } });
    if (!product) return null;
    return plainToInstance(ProductValue, product);
  }

  async listProduct(
    filterProductDto: FilterProductDto,
  ): Promise<ResponseList<ProductValue>> {
    const { textSearch, page, perPage } = filterProductDto;
    const query = this.createQueryBuilder('product');
    query.leftJoinAndSelect('product.category', 'category');
    if (textSearch) {
      query.where(
        'product.name LIKE :textSearch OR product.description LIKE :textSearch OR product.code LIKE :textSearch',
        { textSearch: `%${textSearch}%` },
      );
    }

    query.orderBy('product.updatedAt', 'DESC');
    query.skip((page - 1) * perPage).take(perPage);

    const totalItems = await query.getCount();
    const totalPages = Math.ceil(totalItems / perPage);
    const products = await query.getMany();

    return {
      data: products.map((product) => plainToInstance(ProductValue, product)),
      totalItems,
      totalPages,
      currentPage: page,
      perPage,
    };
  }

  async updateProduct(product: ProductValue): Promise<ProductValue | null> {
    const productUpdated = await this.save(product);
    return plainToInstance(ProductValue, productUpdated);
  }

  async searchProduct(value: string): Promise<ProductValue[]> {
    const query = this.createQueryBuilder('product');
    query.where(
      'product.name LIKE :textSearch OR product.description LIKE :textSearch OR product.code LIKE :textSearch',
      { textSearch: `%${value}%` },
    );
    const products = await query.getMany();
    return products.map((product) => plainToInstance(ProductValue, product));
  }
}
