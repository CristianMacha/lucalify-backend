import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { CreateTradeUseCase } from '../aplication/createTradeUseCase';
import { FilteredTradesUseCase } from '../aplication/filteredTradesUseCase';
import { CreateTradeDto } from '../aplication/dtos/create-trade.dto';
import { FilterTradeDto } from '../aplication/dtos/filter-trade.dto';

@ApiBearerAuth()
@ApiTags('Trade')
@UseGuards(AuthGuard)
@Controller('trade')
export class TradeController {
  constructor(
    private readonly createTradeUseCase: CreateTradeUseCase,
    private readonly filteredTradesUseCase: FilteredTradesUseCase,
  ) {}

  @Post()
  async createTrade(@Body() createTradeDto: CreateTradeDto, @Req() req: any) {
    const payload = req.user;
    return await this.createTradeUseCase.execute(createTradeDto, payload);
  }

  @Get('filter')
  async filteredTrades(@Query() filterTrade: FilterTradeDto) {
    return await this.filteredTradesUseCase.execute(filterTrade);
  }
}
