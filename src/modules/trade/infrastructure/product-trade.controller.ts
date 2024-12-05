import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { GetProductTradeByRangeDateUseCase } from '../aplication/getProductTradeByRangeDateUseCase';
import { FilterProductTradeDto } from '../aplication/dtos/filter-product-trade.dto';

@ApiBearerAuth()
@ApiTags('Product Trade')
@UseGuards(AuthGuard)
@Controller('product-trade')
export class ProductTradeController {
  constructor(
    private readonly getProductTradeByRangeDateUseCase: GetProductTradeByRangeDateUseCase,
  ) {}

  @Get('filter')
  async getProductTradeByRangeDate(
    @Query() filterProductTrade: FilterProductTradeDto,
  ) {
    return await this.getProductTradeByRangeDateUseCase.execute(
      filterProductTrade,
    );
  }
}
