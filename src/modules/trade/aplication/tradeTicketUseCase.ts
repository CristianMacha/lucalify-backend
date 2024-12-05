import { Inject, Injectable } from '@nestjs/common';
import { TradeRepository } from '../domain/trade.repository';
import { PrinterService } from '../../printer/printer.service';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { format } from 'date-fns';

@Injectable()
export class TradeTicketUseCase {
  constructor(
    @Inject('TradeRepository')
    private readonly tradeRepository: TradeRepository,
    private readonly printerService: PrinterService,
  ) {}

  async execute(tradeId: string) {
    const trade = await this.tradeRepository.findByIdForTicket(tradeId);
    if (!trade) {
      throw new Error('Trade not found');
    }

    const docDefinition: TDocumentDefinitions = {
      pageSize: {
        width: 80,
        height: 'auto',
      },
      pageMargins: [5, 5, 5, 5],
      content: [
        {
          text: `Trade Ticket (${trade.type}) ${trade.id.slice(0, 8)}`,
          style: 'header',
        },
        {
          text: `Fecha: ${format(new Date(trade.createdAt), 'dd/MM/yyyy HH:mm:ss')}`,
          style: 'subheader',
        },
        {
          text: `Usuario: ${trade.createdBy}`,
          style: 'subheader',
        },
        {
          text: `Cliente: ${trade.client?.name || '---'}`,
          style: 'subheader',
        },
        {
          text: 'Productos:',
          style: 'sectionHeader',
        },
        ...trade.productTrades.flatMap((productTrade) => [
          {
            text: `${productTrade.product.name}`,
            style: 'product',
          },
          {
            text: `Cantidad: ${productTrade.quantity}  Precio: s/.${productTrade.price}`,
            style: 'productDetail',
          },
        ]),
        {
          text: `Total: s/.${trade.total}`,
          style: 'total',
        },
      ],
      styles: {
        header: {
          fontSize: 8.5,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 5],
        },
        subheader: {
          fontSize: 8,
          bold: true,
          margin: [0, 2, 0, 2],
        },
        sectionHeader: {
          fontSize: 8,
          bold: true,
          margin: [0, 5, 0, 2],
        },
        product: {
          fontSize: 8,
          bold: true,
          margin: [0, 2, 0, 0],
        },
        productDetail: {
          fontSize: 8,
          margin: [0, 0, 0, 2],
        },
        total: {
          fontSize: 8.5,
          bold: true,
          margin: [0, 5, 0, 0],
          alignment: 'right',
        },
      },
    };

    return this.printerService.createPdf(docDefinition);
  }
}
