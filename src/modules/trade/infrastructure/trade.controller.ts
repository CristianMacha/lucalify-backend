import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { CreateTradeUseCase } from '../aplication/createTradeUseCase';
import { FilteredTradesUseCase } from '../aplication/filteredTradesUseCase';
import { CreateTradeDto } from '../aplication/dtos/create-trade.dto';
import { FilterTradeDto } from '../aplication/dtos/filter-trade.dto';
import { TradeReportDto } from '../aplication/dtos/trade-report.dto';
import { ReportTradeByRangeDateUseCase } from '../aplication/reportTradeByRangeDateUseCase';
import { TradeTicketUseCase } from '../aplication/tradeTicketUseCase';
import { GetTradeByIdUseCase } from '../aplication/getTradeByIdUseCase';

@ApiBearerAuth()
@ApiTags('Trade')
@UseGuards(AuthGuard)
@Controller('trade')
export class TradeController {
  constructor(
    private readonly createTradeUseCase: CreateTradeUseCase,
    private readonly filteredTradesUseCase: FilteredTradesUseCase,
    private readonly reportTradeByRangeDateUseCase: ReportTradeByRangeDateUseCase,
    private readonly tradeTicketUseCase: TradeTicketUseCase,
    private readonly getTradeByIdUseCase: GetTradeByIdUseCase,
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

  @Get('report')
  async reportTradeByRangeDate(
    @Query() tradeReportDto: TradeReportDto,
    @Res() res: Response,
  ) {
    const pdfDoc =
      await this.reportTradeByRangeDateUseCase.execute(tradeReportDto);

    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('ticket/:tradeId')
  async tradeTicket(@Param('tradeId') tradeId: string, @Res() res: Response) {
    const pdfDoc = await this.tradeTicketUseCase.execute(tradeId);

    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get(':tradeId')
  async getTradeById(@Param('tradeId') tradeId: string) {
    return await this.getTradeByIdUseCase.execute(tradeId);
  }
}
