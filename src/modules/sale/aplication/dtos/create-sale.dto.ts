import { ApiProperty } from '@nestjs/swagger';
import { CreateSale } from '../../domain/sale.entity';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateProductSaleDto {
  @ApiProperty()
  @IsUUID()
  productId: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  price: number;
}

export class CreateSaleDto implements CreateSale {
  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsUUID()
  readonly clientId?: string;

  @ApiProperty()
  @IsDateString()
  @Type(() => Date)
  paymentDate: Date;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  note: string;

  @ApiProperty({ type: [CreateProductSaleDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateProductSaleDto)
  @IsArray()
  products: CreateProductSaleDto[];
}
