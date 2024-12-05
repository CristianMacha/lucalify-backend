import { Inject, Injectable } from '@nestjs/common';
import { TradeRepository } from '../domain/trade.repository';
import { TradeReportDto } from './dtos/trade-report.dto';
import { PrinterService } from '../../printer/printer.service';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { format } from 'date-fns';

@Injectable()
export class ReportTradeByRangeDateUseCase {
  constructor(
    @Inject('TradeRepository')
    private readonly tradeRepository: TradeRepository,
    private readonly printerService: PrinterService,
  ) {}

  public async execute(tradeReport: TradeReportDto) {
    const { startDate, endDate, tradeType } = tradeReport;
    const trades = await this.tradeRepository.findByRangeDate(tradeReport);
    const docDefinition: TDocumentDefinitions = {
      content: [
        {
          text: `Trade Report (${tradeType}) ${format(startDate, 'dd/MM/yyyy')} - ${format(endDate, 'dd/MM/yyyy')}`,
          style: 'header',
        },
        {
          style: 'tableExample',
          table: {
            body: [
              ['ID', 'FECHA', 'PRECIO', 'COMPRA/VENTA', 'USUARIO'],
              ...trades.map((trade) => [
                trade.id.slice(0, 8),
                format(trade.createdAt, 'dd/MM/yyyy HH:mm:ss'),
                `s/.${trade.total}`,
                trade.type,
                trade.createdBy,
              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
      },
    };
    return this.printerService.createPdf(docDefinition);
  }
}
