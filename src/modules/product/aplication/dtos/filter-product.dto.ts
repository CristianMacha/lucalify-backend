import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterProductDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly textSearch: string;

  @ApiProperty({ default: 1 })
  @IsNumber()
  @Type(() => Number)
  readonly page: number;

  @ApiProperty({ default: 10 })
  @IsNumber()
  @Type(() => Number)
  readonly perPage: number;
}
