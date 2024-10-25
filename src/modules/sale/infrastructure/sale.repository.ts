import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Sale } from './sale.schema';
import { SaleRepository } from '../domain/sale.repository';
import { FilterSale } from '../domain/sale.entity';
import { SaleValue } from '../domain/sale.value';
import { ResponseList } from '../../../common/interfaces/response.interface';
import { plainToInstance } from 'class-transformer';
import { ProductSale } from './product-sale.schema';
import { Product } from 'src/modules/product/infrastructure/product.schema';

@Injectable()
export class SaleMysqlRepository
  extends Repository<Sale>
  implements SaleRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Sale, dataSource.createEntityManager());
  }

  async createSale(sale: SaleValue): Promise<SaleValue | null> {
    return await this.dataSource.transaction(async (manager) => {
      const { productSales, ...onlySale } = sale;
      const newSale = manager.create(Sale, onlySale);

      const saleCreated = await manager.save(Sale, newSale);
      // for await (const payment of payments) {
      //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //   const { sale, ...onlyPayment } = payment;
      //   const newPayment = manager.create(Payment, onlyPayment);
      //   await manager.save(newPayment);
      // }

      for await (const productSale of productSales) {
        const product = manager.create(Product);
        product.id = productSale.product.id;
        const newProductSale = manager.create(ProductSale);
        newProductSale.id = productSale.id;
        newProductSale.sale = saleCreated;
        newProductSale.product = product;
        newProductSale.sale = saleCreated;
        newProductSale.quantity = productSale.quantity;
        newProductSale.price = productSale.price;
        newProductSale.createdBy = productSale.createdBy;
        newProductSale.updatedBy = productSale.updatedBy;
        newProductSale.createdAt = productSale.createdAt;
        newProductSale.updatedAt = productSale.updatedAt;
        await manager.save(newProductSale);
      }

      return saleCreated;
    });
  }

  async listFilteredSale(
    filterSale: FilterSale,
  ): Promise<ResponseList<SaleValue>> {
    const { textSearch, page, perPage, fromDate, toDate } = filterSale;
    const query = this.createQueryBuilder('sale');
    query.where('sale.total > 0');
    // query.innerJoinAndSelect('sale.client', 'client');
    if (textSearch) {
      query.andWhere(
        'client.name LIKE :textSearch OR client.documentNumber LIKE :textSearch',
        { textSearch: `%${textSearch}%` },
      );
    }

    if (fromDate && toDate) {
      query.andWhere('sale.createdAt BETWEEN :fromDate AND :toDate', {
        fromDate,
        toDate,
      });
    }

    query.orderBy('sale.createdAt', 'DESC');
    query.skip((page - 1) * perPage).take(perPage);

    const totalItems = await query.getCount();
    const totalPages = Math.ceil(totalItems / perPage);
    const sales = await query.getMany();
    return {
      data: sales.map((sale) => plainToInstance(SaleValue, sale)),
      totalItems,
      totalPages,
      currentPage: page,
      perPage,
    };
  }

  async findSaleById(id: string): Promise<SaleValue | null> {
    const sale = await this.findOne({ where: { id } });
    if (!sale) return null;
    return plainToInstance(SaleValue, sale);
  }
}
