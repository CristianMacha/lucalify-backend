import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { KardexFilter } from '../../domain/product.value';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class KardexFilterDto implements KardexFilter {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  productCode?: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  endDate: Date;
}
