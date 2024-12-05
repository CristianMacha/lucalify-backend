import { Inject, Injectable } from '@nestjs/common';
import { TradeRepository } from '../domain/trade.repository';

@Injectable()
export class GetTradeByIdUseCase {
  constructor(
    @Inject('TradeRepository')
    private readonly tradeRepository: TradeRepository,
  ) {}

  public async execute(tradeId: string) {
    return await this.tradeRepository.findTradeById(tradeId);
  }
}
