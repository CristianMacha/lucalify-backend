import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { FilterTradeReport } from '../../domain/trade.value';
import { TradeType } from '../../domain/trade.entity';

export class TradeReportDto implements FilterTradeReport {
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  readonly startDate: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  readonly endDate: Date;

  @ApiProperty()
  @IsEnum(TradeType)
  @IsNotEmpty()
  readonly tradeType: TradeType;
}
