import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class createAttributeDto {
  @ApiProperty()
  @IsString()
  readonly name: string;
}
