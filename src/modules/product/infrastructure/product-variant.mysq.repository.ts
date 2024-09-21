import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductVariant } from './product-variant.schema';
import { ProductVariantRepository } from '../domain/product-variant.repository';
import { ProductVariantValue } from '../domain/product-variant.value';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductVariantMysqlRepository
  extends Repository<ProductVariant>
  implements ProductVariantRepository
{
  async registerProductVariant(
    productVariant: ProductVariantValue,
  ): Promise<ProductVariantValue | null> {
    const productVariantCreated = this.create(productVariant);
    const productVariantSaved = await this.save(productVariantCreated);
    return plainToInstance(ProductVariantValue, productVariantSaved);
  }

  async findProductVariantById(
    id: string,
  ): Promise<ProductVariantValue | null> {
    const productVariant = await this.findOne({ where: { id } });
    if (!productVariant) return null;
    return plainToInstance(ProductVariantValue, productVariant);
  }

  async listProductVariant(): Promise<ProductVariantValue[]> {
    const productVariants = await this.find();
    return productVariants.map((productVariant) =>
      plainToInstance(ProductVariantValue, productVariant),
    );
  }
}
