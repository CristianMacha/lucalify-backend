import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SaleRepository } from '../domain/sale.repository';
import { CreateSaleDto } from './dtos/create-sale.dto';
import { Payload } from '../../../common/interfaces/auth.interface';
import { ProductRepository } from '../../product/domain/product.repository';
import { SaleValue } from '../domain/sale.value';
import { PaymentValue } from '../domain/payment.value';
import { ProductSaleValue } from '../domain/product-sale.value';
import { ClientRepository } from '../../client/domain/client.repository';

@Injectable()
export class CreateSaleUseCase {
  constructor(
    @Inject('SaleRepository')
    private readonly saleRepository: SaleRepository,
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    @Inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
  ) {}

  public async execute(createSaleDto: CreateSaleDto, payload: Payload) {
    const { clientId, payments, products } = createSaleDto;
    const paymentsValue: PaymentValue[] = [];
    const productSales: ProductSaleValue[] = [];

    const client = await this.getClientById(clientId);
    if (!client) throw new NotFoundException('Client not found');

    const newSale = new SaleValue(client, 0, 0, 0, payload.name);

    let totalSale = 0;
    for (const payment of payments) {
      totalSale += payment.amount;
      const newPayment = new PaymentValue(
        {
          sale: newSale,
          amount: payment.amount,
          note: payment.note,
          paymentDate: payment.paymentDate,
        },
        payload.name,
      );
      paymentsValue.push(newPayment);
    }
    newSale.payments = paymentsValue;

    for await (const productSale of products) {
      const newProductSale = new ProductSaleValue(
        {
          product: await this.getProductById(productSale.productId),
          sale: newSale,
          quantity: productSale.quantity,
          price: productSale.price,
        },
        payload.name,
      );
      productSales.push(newProductSale);
    }
    newSale.productSales = productSales;
    newSale.total = totalSale;
    return await this.saleRepository.createSale(newSale);
  }

  private async getClientById(clientId: string) {
    return await this.clientRepository.findClientById(clientId);
  }

  private async getProductById(productId: string) {
    return await this.productRepository.findProductById(productId);
  }
}
