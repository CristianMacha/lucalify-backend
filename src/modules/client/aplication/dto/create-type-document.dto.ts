import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeDocumentDto {
  @ApiProperty({ example: 'DNI' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
