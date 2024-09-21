import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Product } from './product.schema';
import { ProductRepository } from '../domain/product.repository';
import { plainToInstance } from 'class-transformer';
import { ProductValue } from '../domain/product.value';

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

  async listProduct(): Promise<ProductValue[]> {
    const products = await this.find();
    return products.map((product) => plainToInstance(ProductValue, product));
  }
}
