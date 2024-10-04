import { ApiProperty } from '@nestjs/swagger';
import {
  CreatePaymentSale,
  CreateProductSale,
  CreateSale,
} from '../../domain/sale.entity';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreatePaymentSaleDto implements CreatePaymentSale {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  note: string;

  @ApiProperty()
  @IsDateString()
  paymentDate: Date;
}

class CreateProductSaleDto implements CreateProductSale {
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
  @IsUUID()
  readonly clientId: string;

  @ApiProperty({ type: [CreateProductSaleDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateProductSaleDto)
  @IsArray()
  products: CreateProductSaleDto[];

  @ApiProperty({ type: [CreatePaymentSaleDto] })
  @ValidateNested({ each: true })
  @Type(() => CreatePaymentSaleDto)
  @IsArray()
  payments: CreatePaymentSaleDto[];
}
