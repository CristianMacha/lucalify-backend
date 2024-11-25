import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Payload } from '../../../common/interfaces/auth.interface';
import { ProductRepository } from '../../product/domain/product.repository';
import { ClientRepository } from '../../client/domain/client.repository';
import { ProductTradeValue } from '../domain/product-trade.value';
import { TradeValue } from '../domain/trade.value';
import { TradeRepository } from '../domain/trade.repository';
import { CreateTradeDto } from './dtos/create-trade.dto';

@Injectable()
export class CreateTradeUseCase {
  constructor(
    @Inject('TradeRepository')
    private readonly tradeRepository: TradeRepository,
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    @Inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
  ) {}

  public async execute(createTradeDto: CreateTradeDto, payload: Payload) {
    const { products, clientId, type } = createTradeDto;
    // const paymentsValue: PaymentValue[] = [];
    const productTrades: ProductTradeValue[] = [];

    const newTrade = new TradeValue(0, 0, 0, payload.name, type);
    if (clientId) {
      const client = await this.getClientById(clientId);
      if (!client) throw new NotFoundException('Client not found');
      newTrade.client = client;
    }

    // for (const payment of payments) {
    //   totalSale += payment.amount;
    //   const newPayment = new PaymentValue(
    //     {
    //       id: payment.id,
    //       sale: newSale,
    //       amount: payment.amount,
    //       note: payment.note,
    //       paymentDate: payment.paymentDate,
    //     },
    //     payload.name,
    //   );
    //   paymentsValue.push(newPayment);
    // }
    // newSale.payments = paymentsValue;
    let totalTrade = 0;
    for await (const productTrade of products) {
      const product = await this.getProductById(productTrade.productId);
      const totalPrice = product.price * productTrade.quantity;
      const newProductTrade = new ProductTradeValue(
        {
          product,
          trade: newTrade,
          quantity: productTrade.quantity,
          price: totalPrice,
        },
        payload.name,
      );
      productTrades.push(newProductTrade);
      totalTrade += totalPrice;
    }

    newTrade.productTrades = productTrades;
    newTrade.total = totalTrade;
    return await this.tradeRepository.createTrade(newTrade);
  }

  private async getClientById(clientId: string) {
    return await this.clientRepository.findClientById(clientId);
  }

  private async getProductById(productId: string) {
    return await this.productRepository.findProductById(productId);
  }
}
