import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FilterTrade, TradeType } from '../../domain/trade.entity';

export class FilterTradeDto implements FilterTrade {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  textSearch?: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  page: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  perPage: number;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  fromDate?: Date;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  toDate?: Date;

  @ApiProperty()
  @IsEnum(TradeType)
  @IsNotEmpty()
  type: TradeType;
}
