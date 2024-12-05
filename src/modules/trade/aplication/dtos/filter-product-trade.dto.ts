import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsDate } from 'class-validator';
import { FilterProductTrade } from '../../domain/product-trade.value';

export class FilterProductTradeDto implements FilterProductTrade {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly textSearch?: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  readonly startDate: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  readonly endDate: Date;
}
