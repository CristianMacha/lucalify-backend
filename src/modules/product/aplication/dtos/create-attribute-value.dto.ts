import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAttributeValueDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly value: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly attributeId: string;
}
