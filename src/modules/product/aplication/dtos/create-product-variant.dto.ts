import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';

export class createProductVariantDto {
  @ApiProperty()
  @IsNumber()
  readonly price: number;

  @ApiProperty()
  @IsUUID()
  readonly productId: string;
}
