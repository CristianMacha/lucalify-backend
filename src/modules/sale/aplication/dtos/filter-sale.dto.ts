import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterSale } from '../../domain/sale.entity';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterSaleDto implements FilterSale {
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
}
