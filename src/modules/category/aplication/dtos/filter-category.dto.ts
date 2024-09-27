import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterCategoryDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly textSearch: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  readonly page: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  readonly perPage: number;
}
