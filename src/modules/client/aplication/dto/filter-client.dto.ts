import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { FilterClient } from '../../domain/client.entity';

export class FilterClientDto implements FilterClient {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  textSearch: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  page: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  perPage: number;
}
