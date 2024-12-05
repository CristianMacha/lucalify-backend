import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  CreateProductTrade,
  CreateTrade,
  TradeType,
} from '../../domain/trade.entity';

class CreateProductTradeDto implements CreateProductTrade {
  @ApiProperty()
  @IsUUID()
  productId: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  price: number;
}

export class CreateTradeDto implements CreateTrade {
  @ApiProperty({ nullable: true })
  @IsUUID()
  @IsOptional()
  readonly clientId?: string;

  @ApiProperty({ type: [CreateProductTradeDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateProductTradeDto)
  @IsArray()
  productTrades: CreateProductTradeDto[];

  @ApiProperty()
  @IsEnum(TradeType)
  @IsNotEmpty()
  type: TradeType;

  // @ApiProperty({ type: [CreatePaymentSaleDto] })
  // @ValidateNested({ each: true })
  // @Type(() => CreatePaymentSaleDto)
  // @IsArray()
  // payments: CreatePaymentSaleDto[];
}
